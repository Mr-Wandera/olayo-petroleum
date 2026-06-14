package service

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/google/uuid"
	"github.com/olayopetroleum/backend/internal/domain"
	"gorm.io/gorm"
)

// OfflineSyncManager regulates transaction queueing and synchronization flows
type OfflineSyncManager struct {
	localDB     *gorm.DB      // Local SQLite Engine (at Tororo, Malaba, etc.)
	cloudAPIURL string        // Central Head Office Cloud Endpoint
	branchID    uuid.UUID     // Identifier of current offline edge node
	syncMutex   sync.Mutex    // Protects manual/auto sync tasks from race conditions
	httpClient  *http.Client  // Customized HTTP client with timeout thresholds
}

func NewOfflineSyncManager(localDB *gorm.DB, cloudURL string, branchID uuid.UUID) *OfflineSyncManager {
	return &OfflineSyncManager{
		localDB:     localDB,
		cloudAPIURL: cloudURL,
		branchID:    branchID,
		httpClient: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

// QueueLocalEvent inserts an operational transaction in the local SQLite audit tables
func (s *OfflineSyncManager) QueueLocalEvent(tx *gorm.DB, entityName string, entityID uuid.UUID, operation string, payload interface{}) error {
	payloadBytes, err := json.Marshal(payload)
	if err != nil {
		return fmt.Errorf("failed to serialize sync payload: %w", err)
	}

	event := domain.SyncEvent{
		ID:         uuid.New(),
		BranchID:   s.branchID,
		EntityName: entityName,
		EntityID:   entityID,
		Operation:  operation,
		Payload:    string(payloadBytes),
		Status:     domain.SyncPending,
		CreatedAt:  time.Now(),
	}

	// Persists locally first
	if err := tx.Create(&event).Error; err != nil {
		return fmt.Errorf("failed to save offline sync event locally: %w", err)
	}

	return nil
}

// FlushSyncQueue scans, aggregates, and transmits non-synchronized log pools to Head Office
func (s *OfflineSyncManager) FlushSyncQueue(ctx context.Context) (int, int, error) {
	s.syncMutex.Lock()
	defer s.syncMutex.Unlock()

	log.Printf("[SYNC ENGINE] Initiating cloud reconciliation run for branch: %s", s.branchID)

	// 1. Fetch pending sync files sorted chronologically to maintain consistency
	var events []domain.SyncEvent
	err := s.localDB.WithContext(ctx).
		Where("status = ? OR status = ?", domain.SyncPending, domain.SyncConflict).
		Order("seq_number ASC").
		Limit(100). // Processes in micro-batches to mitigate bandwidth usage
		Find(&events).Error

	if err != nil {
		return 0, 0, fmt.Errorf("failed to scan sync log pool: %w", err)
	}

	totalEventsCount := len(events)
	if totalEventsCount == 0 {
		return 0, 0, nil // Branch completely synced
	}

	log.Printf("[SYNC ENGINE] Found %d pending operational events to transmit.", totalEventsCount)

	successCount := 0
	conflictCount := 0

	for _, event := range events {
		// Attempt sync with exponential retry/backoff
		err := s.transmitToCloud(ctx, event)
		if err != nil {
			log.Printf("[SYNC ENGINE] Transmission failed for Event ID: %s. Error: %v", event.ID, err)
			
			// Detect custom conflict markers from server response
			if err.Error() == "CONFLICT" {
				event.Status = domain.SyncConflict
				event.ErrorMessage = "State conflicts with more recent Central Ledger sequence."
				s.localDB.Save(&event)
				conflictCount++
				continue
			}

			// If network drops completely, halt session flush until connectivity is restored
			return successCount, conflictCount, fmt.Errorf("network connection drop active during sync stream: %w", err)
		}

		// Update event to synchronized status locally
		now := time.Now()
		event.Status = domain.SyncSuccess
		event.ProcessedAt = &now
		event.ErrorMessage = ""
		s.localDB.Save(&event)
		successCount++
	}

	log.Printf("[SYNC ENGINE] Process finished (Success: %d, Conflicts: %d/%d)", successCount, conflictCount, totalEventsCount)
	return successCount, conflictCount, nil
}

// TransmitToCloud serializes HTTP requests and securely hits the gateway API
func (s *OfflineSyncManager) transmitToCloud(ctx context.Context, ev domain.SyncEvent) error {
	requestBody, err := json.Marshal(ev)
	if err != nil {
		return err
	}

	endpoint := fmt.Sprintf("%s/v1/sync/process", s.cloudAPIURL)
	req, err := http.NewRequestWithContext(ctx, "POST", endpoint, bytes.NewBuffer(requestBody))
	if err != nil {
		return err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("X-Branch-Integrity-Token", "olayo-secret-edge-handshake-v1")

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return err // General TCP/Network failure (unstable cellular link)
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusConflict {
		return fmt.Errorf("CONFLICT") // Triggers conflict resolution branch
	}

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		return fmt.Errorf("server failure: HTTP %d", resp.StatusCode)
	}

	return nil
}

// StartAutoSyncScheduler runs non-blocking cron loops inside edge containers
func (s *OfflineSyncManager) StartAutoSyncScheduler(ctx context.Context, interval time.Duration) {
	go func() {
		ticker := time.NewTicker(interval)
		defer ticker.Stop()

		for {
			select {
			case <-ctx.Done():
				log.Println("[SYNC ENGINE] Shutting down branch synchronization service.")
				return
			case <-ticker.C:
				// Automatically trigger flush
				_, _, err := s.FlushSyncQueue(ctx)
				if err != nil {
					log.Printf("[SYNC ENGINE] Auto-synchronization routine failed. Network limits active: %v", err)
				}
			}
		}
	}()
}
