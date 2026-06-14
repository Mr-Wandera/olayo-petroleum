import React, { useState } from 'react';
import { 
  Terminal, 
  Database, 
  FolderTree, 
  Cpu, 
  Play, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  FileCode, 
  Layers, 
  Lock, 
  Wifi, 
  WifiOff, 
  Server, 
  Zap, 
  ShieldCheck, 
  Activity,
  Maximize2,
  Copy,
  Check
} from 'lucide-react';

// Real code representations from the backend workspace we created
const backendFiles: Record<string, { desc: string; path: string; lang: string; content: string }> = {
  'go.mod': {
    desc: 'The module definition tracking high-performance dependencies in Go 1.24+.',
    path: '/backend/go.mod',
    lang: 'go',
    content: `module github.com/olayopetroleum/backend

go 1.24

require (
	github.com/gin-gonic/gin v1.10.0
	github.com/golang-jwt/jwt/v5 v5.2.1
	github.com/google/uuid v1.6.0
	github.com/redis/go-redis/v9 v9.7.0
	golang.org/crypto v0.31.0
	gorm.io/driver/postgres v1.5.11
	gorm.io/driver/sqlite v1.5.7
	gorm.io/gorm v1.25.12
)`
  },
  'main.go (API Core)': {
    desc: 'Binds Gin gateway endpoints, injects Postgres / Redis client configurations, and fires the background sync brokers.',
    path: '/backend/cmd/api/main.go',
    lang: 'go',
    content: `package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/olayopetroleum/backend/internal/domain"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	DB          *gorm.DB
	RedisClient *redis.Client
	Ctx         = context.Background()
)

func main() {
	log.Println("[Olayo Enterprise] Starting Gin Gateway...")
	
	// v1 Routes Config
	router := gin.Default()
	v1 := router.Group("/api/v1")
	{
		v1.POST("/auth/login", handleLogin)
		v1.POST("/fuel/delivery", recordFuelDelivery)
		v1.POST("/fuel/reconcile", executeFuelReconciliation)
		v1.POST("/sync/process", handleIncomingSyncBundle)
		v1.POST("/logistics/dispatch", dispatchTanker)
	}
	
	router.Run("0.0.0.0:3000")
}`
  },
  'models.go (Domain Models)': {
    desc: 'Declares relational database structures with precise GORM annotations representing PG collections.',
    path: '/backend/internal/domain/models.go',
    lang: 'go',
    content: `package domain

import (
	"time"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Branch struct {
	ID        uuid.UUID      \`gorm:"type:uuid;primaryKey" json:"id"\`
	Name      string         \`gorm:"size:100;not null" json:"name"\`
	Code      string         \`gorm:"size:20;uniqueIndex;not null" json:"code"\`
	Location  string         \`gorm:"size:255;not null" json:"location"\`
	IsActive  bool           \`gorm:"default:true" json:"is_active"\`
}

type Reservoir struct {
	ID            uuid.UUID \`gorm:"type:uuid;primaryKey" json:"id"\`
	BranchID      uuid.UUID \`gorm:"type:uuid;not null" json:"branch_id"\`
	FuelType      string    \`gorm:"type:varchar(30);not null" json:"fuel_type"\` // DIESEL, PETROL
	CapacityLitre float64   \`gorm:"type:decimal(12,2);not null" json:"capacity_litre"\`
	CurrentVolume float64   \`gorm:"type:decimal(12,2);not null" json:"current_volume"\`
}

type SyncEvent struct {
	ID         uuid.UUID  \`gorm:"type:uuid;primaryKey" json:"id"\`
	BranchID   uuid.UUID  \`gorm:"type:uuid;not null;index" json:"branch_id"\`
	EntityName string     \`gorm:"size:100;not null" json:"entity_name"\`
	Operation  string     \`gorm:"size:20;not null" json:"operation"\` // INSERT, UPDATE
	Payload    string     \`gorm:"type:text;not null" json:"payload"\`
	SeqNumber  int64      \`gorm:"type:bigint;autoIncrement" json:"seq_number"\`
	Status     string     \`gorm:"type:varchar(30);default:'PENDING'" json:"status"\`
}`
  },
  'sync_engine.go (Sync Service)': {
    desc: 'Loops through cached SQLite events chronologically & fires HTTP bulk payloads to Kampala Central Command with exponential retries.',
    path: '/backend/internal/service/sync_engine.go',
    lang: 'go',
    content: `package service

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"github.com/olayopetroleum/backend/internal/domain"
	"gorm.io/gorm"
)

type OfflineSyncManager struct {
	localDB     *gorm.DB
	cloudAPIURL string
	httpClient  *http.Client
}

func (s *OfflineSyncManager) FlushSyncQueue(ctx context.Context) (int, error) {
	var events []domain.SyncEvent
	// chronological processing preserves referential order
	s.localDB.Where("status = ?", "PENDING").Order("seq_number ASC").Limit(100).Find(&events)

	for _, event := range events {
		err := s.transmitToCloud(ctx, event)
		if err == nil {
			event.Status = "SYNCHRONIZED"
			s.localDB.Save(&event)
		}
	}
	return len(events), nil
}`
  },
  'k8s-manifests.yaml (K8s Deploy)': {
    desc: 'Durable StatefulSet configs for PostgreSQL database storage and API load balancer specifications.',
    path: '/backend/deployments/k8s-manifests.yaml',
    lang: 'yaml',
    content: `apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: olayopetroleum-db
  namespace: olayopetroleum-prod
spec:
  serviceName: "olayopetroleum-db-service"
  replicas: 1
  template:
    spec:
      containers:
      - name: postgres
        image: postgres:15-alpine
        volumeMounts:
        - name: db-vol
          mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
  - metadata:
      name: db-vol
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 100Gi`
  }
};

const apiEndpoints = [
  {
    method: 'POST',
    path: '/api/v1/auth/login',
    desc: 'Verify user credentials & retrieve JWT session claims.',
    payload: { email: 'admin@olayopetroleum.com', password: 'SecurePassword2026' },
    mockResponse: {
      status: 'success',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YWMxNjh...',
      user: { id: '7ac-0f9c', name: 'Operations Commander', role: 'SUPER_ADMIN', branch: 'CENTRAL_HQ' }
    }
  },
  {
    method: 'POST',
    path: '/api/v1/fuel/delivery',
    desc: 'Record bulk tanker fuel delivery intake verifying carrier legal safety seals.',
    payload: { branch_id: 'tororo_hwy', reservoir_id: 'res_001', litres_delivered: 45000, carrier_seal_code: 'SEAL-TOR-PETROL-889' },
    mockResponse: {
      status: 'APPROVED',
      starting_volume_litres: 5420.5,
      final_volume_litres: 50420.5,
      variance_detected: 0,
      audit_transaction_reference: 'tx_394d7dfv98a'
    }
  },
  {
    method: 'POST',
    path: '/api/v1/fuel/reconcile',
    desc: 'Execute closing reconciliation balancing dipping values against pump counter variances.',
    payload: { reservoir_id: 'res_001', opening_stock: 10450, sales_litres: 15400, closing_dip: 40049 },
    mockResponse: {
      status: 'RECONCILED_WITH_VARIANCE',
      variance_litres: -9.5,
      integrity_accuracy: '99.98%',
      action: 'variance_logged_to_audit_ledger'
    }
  },
  {
    method: 'POST',
    path: '/api/v1/sync/process',
    desc: 'Accept edge transaction sequences checking sequential synchronization bounds.',
    payload: { event_id: 'evt_7781a8b', branch_id: 'tororo_hwy', entity_name: 'store_sale', seq_number: 4053, payload: '{"total_ugx":185000}' },
    mockResponse: {
      status: 'SYNCHRONIZED',
      highest_synchronized_seq: 4053,
      integrity_status: 'VALIDATED'
    }
  }
];

const databaseTables = [
  {
    name: 'branches',
    desc: 'Durable multi-branch location telemetry profiles.',
    columns: [
      { name: 'id', type: 'uuid (Primary Key)', constraint: 'NOT NULL' },
      { name: 'name', type: 'varchar(100)', constraint: 'NOT NULL' },
      { name: 'code', type: 'varchar(20)', constraint: 'UNIQUE INDEX' },
      { name: 'location', type: 'varchar(255)', constraint: 'NOT NULL' },
      { name: 'is_active', type: 'boolean', constraint: 'DEFAULT true' }
    ]
  },
  {
    name: 'reservoirs',
    desc: 'Forecourt underground fuel tank volumes and alert thresholds.',
    columns: [
      { name: 'id', type: 'uuid (Primary Key)', constraint: 'NOT NULL' },
      { name: 'branch_id', type: 'uuid (Foreign Key)', constraint: 'NOT NULL, INDEX' },
      { name: 'fuel_type', type: 'varchar(30)', constraint: 'NOT NULL (DIESEL, PETROL)' },
      { name: 'capacity_litre', type: 'decimal(12,2)', constraint: 'NOT NULL' },
      { name: 'current_volume', type: 'decimal(12,2)', constraint: 'NOT NULL' },
      { name: 'low_stock_alert', type: 'decimal(12,2)', constraint: 'NOT NULL' }
    ]
  },
  {
    name: 'sync_events',
    desc: 'Edge local SQLite queue logs tracking pending central synchronizations.',
    columns: [
      { name: 'id', type: 'uuid (Primary Key)', constraint: 'NOT NULL' },
      { name: 'branch_id', type: 'uuid (Foreign Key)', constraint: 'NOT NULL, INDEX' },
      { name: 'entity_name', type: 'varchar(100)', constraint: 'NOT NULL' },
      { name: 'operation', type: 'varchar(20)', constraint: 'NOT NULL (INSERT, UPDATE)' },
      { name: 'payload', type: 'text', constraint: 'NOT NULL (JSON payload)' },
      { name: 'seq_number', type: 'bigint', constraint: 'AUTO INCREMENT' },
      { name: 'status', type: 'varchar(30)', constraint: 'DEFAULT PENDING' }
    ]
  },
  {
    name: 'audit_records',
    desc: 'Immutable central trace records preserving historical staff actions.',
    columns: [
      { name: 'id', type: 'uuid (Primary Key)', constraint: 'NOT NULL' },
      { name: 'user_id', type: 'uuid', constraint: 'NOT NULL, INDEX' },
      { name: 'action', type: 'varchar(150)', constraint: 'NOT NULL (GORM Immutable Hook)' },
      { name: 'details', type: 'text', constraint: 'JSON Payload' },
      { name: 'timestamp', type: 'timestamp', constraint: 'NOT NULL DEFAULT NOW()' }
    ]
  }
];

export default function DeveloperHub() {
  const [activeSegment, setActiveSegment] = useState<'workspace' | 'api' | 'sync' | 'erd'>('workspace');
  
  // Workspace controls
  const [selectedFile, setSelectedFile] = useState<string>('main.go (API Core)');
  const [copiedFile, setCopiedFile] = useState(false);

  // API sandbox controls
  const [selectedEndpoint, setSelectedEndpoint] = useState(apiEndpoints[0]);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [isApiLoading, setIsApiLoading] = useState(false);

  // Sync simulator controls
  const [connectionState, setConnectionState] = useState<'stable' | 'unstable' | 'offline'>('stable');
  const [localQueueCount, setLocalQueueCount] = useState<number>(0);
  const [syncHistory, setSyncHistory] = useState<string[]>([
    'System: Local branch nodes initialized.',
    'System: Head office handshake validated.'
  ]);
  const [isResolvingSync, setIsResolvingSync] = useState(false);

  // ERD table state
  const [selectedTable, setSelectedTable] = useState(databaseTables[0]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(backendFiles[selectedFile].content);
    setCopiedFile(true);
    setTimeout(() => setCopiedFile(false), 2000);
  };

  const handleTriggerMockApi = () => {
    setIsApiLoading(true);
    setApiResponse(null);
    setTimeout(() => {
      setApiResponse(selectedEndpoint.mockResponse);
      setIsApiLoading(false);
    }, 600);
  };

  const handleSimulateTransaction = () => {
    const transactionId = Math.random().toString(36).substr(2, 9).toUpperCase();
    setLocalQueueCount(prev => prev + 1);
    
    let logMsg = '';
    if (connectionState === 'stable') {
      logMsg = `[LOCAL] Transaction tx_${transactionId} recorded. Routing directly to central Postgres... Success.`;
      setLocalQueueCount(prev => Math.max(0, prev - 1));
    } else {
      logMsg = `[OFFLINE] Connection ${connectionState === 'offline' ? 'DARK' : 'STALE'}. tx_${transactionId} cached in local SQLite sync_events.`;
    }
    setSyncHistory(prev => [logMsg, ...prev]);
  };

  const handleTriggerManualSync = () => {
    if (localQueueCount === 0) return;
    if (connectionState === 'offline') {
      setSyncHistory(prev => ['[SYNC EXCEPTION] Unable to sync. Link state report: DISCONNECTED.', ...prev]);
      return;
    }

    setIsResolvingSync(true);
    setSyncHistory(prev => ['[SYNC ENGINE] Handshake started. Processing sequence bounds...', ...prev]);

    setTimeout(() => {
      const synced = localQueueCount;
      setLocalQueueCount(0);
      setSyncHistory(prev => [
        `[SUCCESS] Flushed ${synced} events from SQLite to Postgres. Core sequences updated to cursor seq_4053.`,
        ...prev
      ]);
      setIsResolvingSync(false);
    }, 1200);
  };

  return (
    <section id="developer-hub" className="py-24 transition-colors duration-300 bg-neutral-950 text-neutral-200 border-t border-neutral-900 relative overflow-hidden">
      
      {/* Decorative Blueprint Background Mesh */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(#10b981 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Zone */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-green-400 uppercase tracking-widest font-mono flex items-center gap-2">
              <Cpu className="w-4 h-4 animate-spin text-green-500" /> Golang Systems Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1">
              OLAYO ENTERPRISE ARCHITECTURE HUB
            </h2>
            <div className="w-20 h-1 bg-green-500 mt-3 rounded-full" />
            <p className="mt-4 text-xs text-neutral-400 leading-relaxed font-normal">
              Explore the professional Go backend specification designed for Olayo Petroleum. Digitize multiple branches, run offline queue-based syncing over cellular drops, handle real-time GORM database models, and review deployment Kubernetes clusters. For developer support questions, connect directly at <span className="font-bold text-green-400 font-mono">+254 798 080038</span>.
            </p>
          </div>

          <div className="mt-6 md:mt-0 inline-flex items-center gap-3 bg-neutral-900 border border-neutral-800 p-4 rounded-2xl shrink-0">
            <Activity className="w-6 h-6 text-green-400 animate-pulse" />
            <div>
              <span className="text-xs font-mono text-neutral-400 block uppercase font-bold">API Server Port</span>
              <span className="text-sm font-black text-white font-mono tracking-wider">0.0.0.0:3000 (Go 1.24)</span>
            </div>
          </div>
        </div>

        {/* Global Architecture Tabs Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 bg-neutral-900 border border-neutral-800 p-1.5 rounded-2xl shadow-lg">
          <button
            onClick={() => setActiveSegment('workspace')}
            className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSegment === 'workspace'
                ? 'bg-green-600 text-white shadow'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span>GO CODE WORKSPACE</span>
          </button>

          <button
            onClick={() => setActiveSegment('api')}
            className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSegment === 'api'
                ? 'bg-green-600 text-white shadow'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>REST API SANDBOX</span>
          </button>

          <button
            onClick={() => setActiveSegment('sync')}
            className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSegment === 'sync'
                ? 'bg-green-600 text-white shadow'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Wifi className="w-4 h-4" />
            <span>DURABLE SYNC SIMULATOR</span>
          </button>

          <button
            onClick={() => setActiveSegment('erd')}
            className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSegment === 'erd'
                ? 'bg-green-600 text-white shadow'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>GORM POSTGRES ERD SCHEMA</span>
          </button>
        </div>

        {/* Dynamic Display Panels */}
        <div className="grid grid-cols-1 gap-8">
          
          {/* 1. CODE WORKSPACE EXPLORER */}
          {activeSegment === 'workspace' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Directory files buttons */}
              <div className="lg:col-span-4 bg-neutral-900 border border-neutral-800 p-5 rounded-3xl space-y-2">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest font-mono block mb-2">Workspace Tree Structure</span>
                {Object.keys(backendFiles).map(fileName => (
                  <button
                    key={fileName}
                    onClick={() => setSelectedFile(fileName)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                      selectedFile === fileName
                        ? 'bg-neutral-800 border-green-500 text-green-400'
                        : 'bg-neutral-950 border-neutral-850 hover:border-neutral-805 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FileCode className="w-4 h-4 shrink-0 text-green-500" />
                      <div className="text-left">
                        <span className="text-xs font-black uppercase font-mono block group-hover:text-green-400">{fileName}</span>
                        <span className="text-[9px] text-neutral-500 font-mono block mt-0.5">{backendFiles[fileName].path}</span>
                      </div>
                    </div>
                  </button>
                ))}

                <div className="mt-8 p-4 rounded-xl bg-green-500/5 border border-green-500/10 space-y-2">
                  <span className="text-[10px] font-mono font-black text-green-405 uppercase tracking-wide block">Architect Note:</span>
                  <p className="text-[11px] text-neutral-400 leading-relaxed font-normal">
                    This codebase is structured with Clean Domain-Driven Design (Hexagonal architecture). Use the Gugen build tool or run <code className="text-green-450 bg-neutral-950 px-1 py-0.5 rounded font-mono">go build ./...</code> to compile of all services locally.
                  </p>
                </div>
              </div>

              {/* Code display screen */}
              <div className="lg:col-span-8 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden flex flex-col justify-between">
                
                {/* Code Header Bar */}
                <div className="bg-neutral-950 py-4 px-6 border-b border-neutral-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">{selectedFile}</h3>
                    <p className="text-xs text-neutral-500 mt-1">{backendFiles[selectedFile].desc}</p>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center space-x-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 px-3 py-1.5 rounded-xl text-[10px] uppercase font-mono tracking-wider font-bold transition-all text-neutral-300"
                  >
                    {copiedFile ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedFile ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>

                {/* Simulated Code Textarea */}
                <div className="p-6 bg-neutral-950 font-mono text-xs overflow-x-auto text-green-450 select-text leading-relaxed whitespace-pre min-h-[380px] border-b border-neutral-800">
                  {backendFiles[selectedFile].content}
                </div>

                <div className="px-6 py-4 bg-neutral-900/40 text-[10px] text-neutral-500 font-mono flex items-center justify-between">
                  <span>Location: {backendFiles[selectedFile].path}</span>
                  <span>Type: {backendFiles[selectedFile].lang === 'go' ? 'Go Native Unit' : 'Config Spec'}</span>
                </div>

              </div>
            </div>
          )}

          {/* 2. REST API SANDBOX TESTER */}
          {activeSegment === 'api' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Endpoint selection */}
              <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 p-6 rounded-3xl space-y-4">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest font-mono block">Endpoints Mapping Suite</span>
                
                <div className="space-y-3">
                  {apiEndpoints.map((endpoint, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setSelectedEndpoint(endpoint); setApiResponse(null); }}
                      className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer block ${
                        selectedEndpoint.path === endpoint.path
                          ? 'bg-neutral-800 border-green-500 text-white'
                          : 'bg-neutral-950 border-neutral-850 hover:border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[9px] font-mono font-black bg-green-500/15 text-green-400 px-2 py-0.5 rounded">
                          {endpoint.method}
                        </span>
                        <span className="text-xs font-bold font-mono tracking-tight text-white">{endpoint.path}</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 truncate font-normal leading-relaxed">
                        {endpoint.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Endpoint Runner Interactive Console */}
              <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden flex flex-col min-h-[460px]">
                
                {/* Console Bar */}
                <div className="bg-neutral-900/60 py-4 px-6 border-b border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-green-500 animate-pulse" />
                    <span className="text-xs font-bold text-white font-mono uppercase tracking-widest">Interactive API Console Shell</span>
                  </div>
                  <button
                    onClick={handleTriggerMockApi}
                    disabled={isApiLoading}
                    className="flex items-center space-x-1.5 bg-green-600 hover:bg-green-700 disabled:bg-neutral-800 disabled:text-neutral-500 px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-bold transition-all text-white cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 text-white inline shrink-0" />
                    <span>{isApiLoading ? 'Processing Request...' : 'Trigger Request'}</span>
                  </button>
                </div>

                <div className="p-6 space-y-6 flex-grow bg-neutral-950">
                  {/* Selected request parameters */}
                  <div>
                    <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest block mb-2">Request Body Payload:</span>
                    <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-850 font-mono text-xs text-neutral-350">
                      {JSON.stringify(selectedEndpoint.payload, null, 2)}
                    </div>
                  </div>

                  {/* REST API Output display */}
                  <div>
                    <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest block mb-2">API Output JSON Stream:</span>
                    {apiResponse ? (
                      <div className="p-5 bg-neutral-900/90 rounded-2xl border border-green-500/15 font-mono text-xs text-green-400 overflow-x-auto">
                        <span className="text-[9px] bg-green-500/15 text-green-400 border border-green-500/30 px-1.5 py-0.5 rounded uppercase font-bold tracking-widest block w-max mb-3">HTTP 200 OK</span>
                        {JSON.stringify(apiResponse, null, 2)}
                      </div>
                    ) : (
                      <div className="p-8 bg-neutral-900/40 border border-dashed border-neutral-800 rounded-2xl flex flex-col items-center justify-center text-center text-xs text-neutral-500">
                        {isApiLoading ? (
                          <div className="flex flex-col items-center gap-3">
                            <RefreshCw className="w-8 h-8 text-green-400 animate-spin" />
                            <span>Routing over secure Gateway... Negotiating cryptographic handshakes...</span>
                          </div>
                        ) : (
                          <span>Click "Trigger Request" to serialize payload and fetch transactional values from the Go microservice environment.</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 3. DURABLE SYNCHRONIZATION SIMULATOR */}
          {activeSegment === 'sync' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Sync Dashboard controls */}
              <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 p-6 rounded-3xl space-y-6">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest font-mono block">Offline Synchronization Controls</span>

                {/* Connection toggles */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-neutral-400 block uppercase">Simulated Link State:</span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setConnectionState('stable')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer ${
                        connectionState === 'stable'
                          ? 'bg-green-500/10 border-green-500 text-green-400'
                          : 'bg-neutral-950 border-neutral-850 text-neutral-505'
                      }`}
                    >
                      <Wifi className="w-4 h-4 text-green-400" />
                      <span>STABLE</span>
                    </button>

                    <button
                      onClick={() => setConnectionState('unstable')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer ${
                        connectionState === 'unstable'
                          ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                          : 'bg-neutral-950 border-neutral-850 text-neutral-505'
                      }`}
                    >
                      <Activity className="w-4 h-4 text-amber-400" />
                      <span>UNSTABLE</span>
                    </button>

                    <button
                      onClick={() => setConnectionState('offline')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer ${
                        connectionState === 'offline'
                          ? 'bg-red-500/10 border-red-500 text-red-500'
                          : 'bg-neutral-950 border-neutral-850 text-neutral-505'
                      }`}
                    >
                      <WifiOff className="w-4 h-4 text-red-500" />
                      <span>OFFLINE</span>
                    </button>
                  </div>
                </div>

                {/* Simulator actions */}
                <div className="space-y-3 pt-4 border-t border-neutral-800">
                  <button
                    onClick={handleSimulateTransaction}
                    className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 font-bold rounded-xl text-xs uppercase tracking-wide transition-all text-white cursor-pointer"
                  >
                    Simulate Forecourt Transaction
                  </button>

                  <button
                    onClick={handleTriggerManualSync}
                    disabled={localQueueCount === 0 || isResolvingSync}
                    className="w-full py-3 px-4 bg-neutral-950 hover:bg-neutral-850 disabled:bg-neutral-900 disabled:text-neutral-600 border border-neutral-800 font-mono text-xs font-bold uppercase tracking-wide transition-all text-white flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className={`w-4 h-4 ${isResolvingSync ? 'animate-spin' : ''}`} />
                    <span>Draining Sync Queue ({localQueueCount} Pending)</span>
                  </button>
                </div>

                <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-855 text-xs space-y-1 text-neutral-400 leading-normal">
                  <span className="font-bold text-neutral-200 uppercase block mb-1">Durable queue state info:</span>
                  When the station in Tororo transactions drop off the grid, logs are held in local caches. Changing connection states to **STABLE** and pressing **"Draining Sync Queue"** replicates how Go background workers sync arrays up to central PostgreSQL databases.
                </div>
              </div>

              {/* Logger interface output terminal */}
              <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden flex flex-col min-h-[420px]">
                <div className="bg-neutral-900/60 py-4 px-6 border-b border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Server className="w-5 h-5 text-green-500" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-widest">Durable sync broker terminal</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-neutral-500">Integrity state:</span>
                    <span className="text-green-400 font-bold uppercase tracking-tight">VERIFIED</span>
                  </div>
                </div>

                <div className="p-6 bg-neutral-950 flex-grow font-mono text-xs text-neutral-350 space-y-3 overflow-y-auto max-h-[360px] leading-relaxed">
                  {syncHistory.map((log, idx) => (
                    <div key={idx} className={`p-2 rounded ${
                      log.includes('[SUCCESS]') 
                        ? 'bg-green-500/5 text-green-400 border border-green-500/10' 
                        : log.includes('[OFFLINE]') 
                        ? 'bg-red-500/5 text-rose-400 border border-red-500/10'
                        : log.includes('[SYNC EXCEPTION]')
                        ? 'bg-red-650/15 text-red-400 border border-red-505/20 font-bold'
                        : 'text-neutral-400'
                    }`}>
                      <span className="text-[10px] text-neutral-600 block mb-1">{new Date().toLocaleTimeString()}</span>
                      {log}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* 4. POSTGRES ERD SCHEMA MAP */}
          {activeSegment === 'erd' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Tables Navigation column */}
              <div className="lg:col-span-4 bg-neutral-900 border border-neutral-800 p-5 rounded-3xl space-y-2">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest font-mono block mb-2">Relational Entities (GORM)</span>
                {databaseTables.map((table, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedTable(table)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                      selectedTable.name === table.name
                        ? 'bg-neutral-800 border-green-500 text-green-400'
                        : 'bg-neutral-950 border-neutral-850 hover:border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-black uppercase font-mono block group-hover:text-green-400">{table.name}</span>
                      <p className="text-[10px] text-neutral-500 truncate max-w-[200px] mt-0.5">{table.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Table schema schema sheet */}
              <div className="lg:col-span-8 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden flex flex-col justify-between">
                
                {/* Schema Header */}
                <div className="bg-neutral-950 py-4 px-6 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-green-500" />
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">TABLE DEFINITIONS: {selectedTable.name}</h3>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">{selectedTable.desc}</p>
                </div>

                {/* Schema Columns Table */}
                <div className="overflow-x-auto min-h-[320px]">
                  <table className="w-full text-xs text-left font-mono">
                    <thead className="bg-neutral-950 text-neutral-400 text-[10px] font-bold uppercase tracking-wider border-b border-neutral-800">
                      <tr>
                        <th scope="col" className="px-6 py-3.5">COLUMN FIELD</th>
                        <th scope="col" className="px-6 py-3.5">POSTGRES TYPE</th>
                        <th scope="col" className="px-6 py-3.5">GORM MAPPING / ANNOTATIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-805">
                      {selectedTable.columns.map((col, idx) => (
                        <tr key={idx} className="hover:bg-neutral-950/40">
                          <td className="px-6 py-4 font-bold text-green-400">{col.name}</td>
                          <td className="px-6 py-4 text-neutral-350">{col.type}</td>
                          <td className="px-6 py-4 text-neutral-500">{col.constraint}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="px-6 py-4 bg-neutral-950 text-[10px] text-neutral-500 font-mono text-center border-t border-neutral-800 flex items-center justify-between">
                  <span>Engine: InnoDB/PostgreSQL 15</span>
                  <span className="text-green-550 font-bold uppercase tracking-widest font-mono">DB Isolation Active</span>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
