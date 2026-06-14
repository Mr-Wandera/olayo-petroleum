package domain

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// ==========================================
// 1. MULTI-BRANCH & CORE TENANCY MODELS
// ==========================================

type Branch struct {
	ID               uuid.UUID      `gorm:"type:uuid;primaryKey" json:"id"`
	Name             string         `gorm:"size:100;not null" json:"name"`
	Code             string         `gorm:"size:20;uniqueIndex;not null" json:"code"` // e.g. TORORO_HW_01
	Location         string         `gorm:"size:255;not null" json:"location"`
	Coordinates      string         `gorm:"size:50" json:"coordinates"` // 0.6865, 34.1798
	PlusCode         string         `gorm:"size:50" json:"plus_code"`   // M5JH+Q3C, Tororo
	StrategicContext string         `gorm:"type:text" json:"strategic_context"`
	Phone            string         `gorm:"size:50" json:"phone"`
	IsActive         bool           `gorm:"default:true" json:"is_active"`
	CreatedAt        time.Time      `json:"created_at"`
	UpdatedAt        time.Time      `json:"updated_at"`
	DeletedAt        gorm.DeletedAt `gorm:"index" json:"-"`

	// Relationships
	Reservoirs  []Reservoir  `gorm:"foreignKey:BranchID" json:"reservoirs,omitempty"`
	Pumps       []FuelPump   `gorm:"foreignKey:BranchID" json:"pumps,omitempty"`
	Staff       []User       `gorm:"foreignKey:BranchID" json:"staff,omitempty"`
	Inventory   []StockItem  `gorm:"foreignKey:BranchID" json:"inventory,omitempty"`
	WorkOrders  []WorkOrder  `gorm:"foreignKey:BranchID" json:"work_orders,omitempty"`
	WashRecords []WashRecord `gorm:"foreignKey:BranchID" json:"wash_records,omitempty"`
	Sales       []StoreSale  `gorm:"foreignKey:BranchID" json:"sales,omitempty"`
}

// ==========================================
// 2. AUTHENTICATION & DETERMINISTIC RBAC
// ==========================================

type Role string

const (
	RoleSuperAdmin        Role = "SUPER_ADMIN"
	RoleManagingDirector  Role = "MANAGING_DIRECTOR"
	RoleOperationsManager Role = "OPERATIONS_MANAGER"
	RoleBranchManager     Role = "BRANCH_MANAGER"
	RoleFuelAttendant     Role = "FUEL_ATTENDANT"
	RoleMechanic          Role = "MECHANIC"
	RoleStoreManager      Role = "STORE_MANAGER"
	RoleCashier           Role = "CASHIER"
	RoleLogisticsManager  Role = "LOGISTICS_MANAGER"
	RoleDriver            Role = "DRIVER"
	RoleAuditor           Role = "AUDITOR"
	RoleCustomer          Role = "CUSTOMER"
)

type Permission struct {
	ID          uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	Slug        string    `gorm:"size:100;uniqueIndex;not null" json:"slug"` // e.g. fuel:read, fuel:write
	Description string    `gorm:"size:255" json:"description"`
}

type User struct {
	ID           uuid.UUID      `gorm:"type:uuid;primaryKey" json:"id"`
	BranchID     *uuid.UUID     `gorm:"type:uuid" json:"branch_id,omitempty"` // Nullable for global admins
	Email        string         `gorm:"size:150;uniqueIndex;not null" json:"email"`
	PasswordHash string         `gorm:"size:255;not null" json:"-"`
	FullName     string         `gorm:"size:100;not null" json:"full_name"`
	Phone        string         `gorm:"size:50" json:"phone"`
	Role         Role           `gorm:"type:varchar(50);not null" json:"role"`
	IsActive     bool           `gorm:"default:true" json:"is_active"`
	MfaSecret    string         `gorm:"size:128" json:"-"`
	MfaEnabled   bool           `gorm:"default:false" json:"mfa_enabled"`
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}

type UserSession struct {
	ID           uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	UserID       uuid.UUID `gorm:"type:uuid;not null" json:"user_id"`
	RefreshToken string    `gorm:"size:512;not null" json:"refresh_token"`
	DeviceIP     string    `gorm:"size:45" json:"device_ip"`
	UserAgent    string    `gorm:"size:255" json:"user_agent"`
	IsRevoked    bool      `gorm:"default:false" json:"is_revoked"`
	ExpiresAt    time.Time `json:"expires_at"`
	CreatedAt    time.Time `json:"created_at"`
}

// ==========================================
// 3. FUEL INVENTORY & DIGITAL FORECOURT
// ==========================================

type FuelType string

const (
	FuelDiesel    FuelType = "DIESEL"
	FuelPetrol    FuelType = "PETROL"
	FuelLubricant FuelType = "LUBRICANTS"
)

type Reservoir struct {
	ID            uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	BranchID      uuid.UUID `gorm:"type:uuid;not null" json:"branch_id"`
	FuelType      FuelType  `gorm:"type:varchar(30);not null" json:"fuel_type"`
	CapacityLitre float64   `gorm:"type:decimal(12,2);not null" json:"capacity_litre"`
	CurrentVolume float64   `gorm:"type:decimal(12,2);not null" json:"current_volume"`
	LowStockAlert float64   `gorm:"type:decimal(12,2);not null" json:"low_stock_alert"`
	TankDipHeight float64   `gorm:"type:decimal(8,2)" json:"tank_dip_height"` // Physical reference depth mm
	UpdatedAt     time.Time `json:"updated_at"`
}

type FuelPump struct {
	ID          uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	BranchID    uuid.UUID `gorm:"type:uuid;not null" json:"branch_id"`
	ReservoirID uuid.UUID `gorm:"type:uuid;not null" json:"reservoir_id"`
	NozzleCode  string    `gorm:"size:20" json:"nozzle_code"` // e.g., PUMP01_NZ01
	Totalizer   float64   `gorm:"type:decimal(15,2);not null" json:"totalizer"` // Lifetime volumetric count
	IsActive    bool      `gorm:"default:true" json:"is_active"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type FuelLogType string

const (
	LogIntake         FuelLogType = "DELIVERY_INTAKE"
	LogSale           FuelLogType = "PUMP_SALE"
	LogReconciliation FuelLogType = "RECONCILIATION"
	LogVarianceAlert  FuelLogType = "VARIANCE_ALERT"
)

type FuelInventoryLog struct {
	ID             uuid.UUID   `gorm:"type:uuid;primaryKey" json:"id"`
	BranchID       uuid.UUID   `gorm:"type:uuid;not null" json:"branch_id"`
	ReservoirID    uuid.UUID   `gorm:"type:uuid;not null" json:"reservoir_id"`
	LogType        FuelLogType `gorm:"type:varchar(40);not null" json:"log_type"`
	DeltaLitres    float64     `gorm:"type:decimal(12,2);not null" json:"delta_litres"`
	StartingVolume float64     `gorm:"type:decimal(12,2);not null" json:"starting_volume"`
	ClosingVolume  float64     `gorm:"type:decimal(12,2);not null" json:"closing_volume"`
	VarianceLitre  float64     `gorm:"type:decimal(10,2);default:0.0" json:"variance_litre"` // Discrepancy detected
	ReferenceID    string      `gorm:"size:100" json:"reference_id"` // TransactionID or TankerDeliveryID
	RecordedByID   uuid.UUID   `gorm:"type:uuid;not null" json:"recorded_by_id"`
	CreatedAt      time.Time   `json:"created_at"`
}

// ==========================================
// 4. DISTRIBUTION & LOGISTICS DOMAIN
// ==========================================

type TankerStatus string

const (
	TankerIdle      TankerStatus = "IDLE"
	TankerLoading   TankerStatus = "LOADING"
	TankerTransit   TankerStatus = "IN_TRANSIT"
	TankerDelivering TankerStatus = "DELIVERING"
	TankerAvailable TankerStatus = "AVAILABLE"
)

type Tanker struct {
	ID             uuid.UUID    `gorm:"type:uuid;primaryKey" json:"id"`
	PlateNumber    string       `gorm:"size:30;uniqueIndex;not null" json:"plate_number"` // UBL 789X
	Brand          string       `gorm:"size:50;not null" json:"brand"`                     // Scania, Mercedes
	DieselCapacity float64      `gorm:"type:decimal(10,2);not null" json:"diesel_capacity_limit"`
	PetrolCapacity float64      `gorm:"type:decimal(10,2);not null" json:"petrol_capacity_limit"`
	Status         TankerStatus `gorm:"type:varchar(30);default:'IDLE'" json:"status"`
	CurrentGPS     string       `gorm:"size:100" json:"current_gps"`
	UpdatedAt      time.Time    `json:"updated_at"`
}

type DeliveryCargoStatus string

const (
	CargoScheduled DeliveryCargoStatus = "SCHEDULED"
	CargoLoading   DeliveryCargoStatus = "LOADING"
	CargoEnRoute   DeliveryCargoStatus = "EN_ROUTE"
	CargoDelivered DeliveryCargoStatus = "DELIVERED"
	CargoCancelled DeliveryCargoStatus = "CANCELLED"
)

type TankerDelivery struct {
	ID                uuid.UUID           `gorm:"type:uuid;primaryKey" json:"id"`
	TankerID          uuid.UUID           `gorm:"type:uuid;not null" json:"tanker_id"`
	DriverID          uuid.UUID           `gorm:"type:uuid;not null" json:"driver_id"` // User ID with role DRIVER
	SourceDepot       string              `gorm:"size:100;not null" json:"source_depot"`
	DestBranchID      uuid.UUID           `gorm:"type:uuid;not null" json:"dest_branch_id"`
	FuelType          FuelType            `gorm:"type:varchar(30);not null" json:"fuel_type"`
	VolumeLoadedLitre float64             `gorm:"type:decimal(12,2);not null" json:"volume_loaded_litre"`
	VolumeDelivered   float64             `gorm:"type:decimal(12,2)" json:"volume_delivered_litre"`
	DischargeVariance float64             `gorm:"type:decimal(10,2)" json:"discharge_variance_litre"`
	GPSLoaded         string              `gorm:"size:50" json:"gps_loaded"`
	GPSDelivered      string              `gorm:"size:50" json:"gps_delivered"`
	CarrierSealCode   string              `gorm:"size:100;not null" json:"carrier_seal_code"` // Lock integrity verification
	CargoStatus       DeliveryCargoStatus `gorm:"type:varchar(35);not null" json:"cargo_status"`
	ScheduledDate     time.Time           `json:"scheduled_date"`
	DepartureTime     *time.Time          `json:"departure_time,omitempty"`
	ArrivalTime       *time.Time          `json:"arrival_time,omitempty"`
	CreatedAt         time.Time           `json:"created_at"`
	UpdatedAt         time.Time           `json:"updated_at"`
}

// ==========================================
// 5. GARAGE MANAGEMENT SCHEMAS
// ==========================================

type ServiceStatus string

const (
	ServicePending    ServiceStatus = "PENDING_INSPECTION"
	ServiceInProgress ServiceStatus = "IN_PROGRESS"
	ServiceTesting    ServiceStatus = "ROAD_TESTING"
	ServiceCompleted  ServiceStatus = "COMPLETED"
	ServiceReleased   ServiceStatus = "VEHICLE_RELEASED"
)

type WorkOrder struct {
	ID               uuid.UUID     `gorm:"type:uuid;primaryKey" json:"id"`
	BranchID         uuid.UUID     `gorm:"type:uuid;not null" json:"branch_id"`
	CustomerName     string        `gorm:"size:120;not null" json:"customer_name"`
	CustomerPhone    string        `gorm:"size:50;not null" json:"customer_phone"`
	VehiclePlate     string        `gorm:"size:30;not null" json:"vehicle_plate"`
	VehicleModel     string        `gorm:"size:100;not null" json:"vehicle_model"`
	IssueDescription string        `gorm:"type:text;not null" json:"issue_description"`
	DiagnosisSummary string        `gorm:"type:text" json:"diagnosis_summary"`
	MechanicID       uuid.UUID     `gorm:"type:uuid;not null" json:"mechanic_id"` // User ID with role MECHANIC
	Status           ServiceStatus `gorm:"type:varchar(35);default:'PENDING_INSPECTION'" json:"status"`
	PartsCost        float64       `gorm:"type:decimal(12,2);default:0.0" json:"parts_cost_ugx"`
	LaborCost        float64       `gorm:"type:decimal(12,2);default:0.0" json:"labor_cost_ugx"`
	TotalCost        float64       `gorm:"type:decimal(12,2);default:0.0" json:"total_cost_ugx"`
	IsPaid           bool          `gorm:"default:false" json:"is_paid"`
	CreatedAt        time.Time     `json:"created_at"`
	UpdatedAt        time.Time     `json:"updated_at"`
}

// ==========================================
// 6. WASHING BAY OPERATIONAL TRACKING
// ==========================================

type WashRecord struct {
	ID           uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	BranchID     uuid.UUID `gorm:"type:uuid;not null" json:"branch_id"`
	VehiclePlate string    `gorm:"size:30;not null" json:"vehicle_plate"`
	VehicleType  string    `gorm:"size:50;not null" json:"vehicle_type"` // Sedan, SUV, Big Truck
	WashPackage  string    `gorm:"size:100;not null" json:"wash_package"` // Standard, Premium Foam, Detailing
	PriceUGX     float64   `gorm:"type:decimal(12,2);not null" json:"price_ugx"`
	AttendantID  uuid.UUID `gorm:"type:uuid;not null" json:"attendant_id"` // User ID
	Commission   float64   `gorm:"type:decimal(10,2)" json:"commission_ugx"`
	IsCompleted  bool      `gorm:"default:false" json:"is_completed"`
	CreatedAt    time.Time `json:"created_at"`
}

// ==========================================
// 7. SUPERMARKET AUTOMATED INVENTORY
// ==========================================

type StockItem struct {
	ID           uuid.UUID      `gorm:"type:uuid;primaryKey" json:"id"`
	BranchID     uuid.UUID      `gorm:"type:uuid;not null" json:"branch_id"`
	Barcode      string         `gorm:"size:100;index" json:"barcode"`
	ItemName     string         `gorm:"size:150;not null" json:"item_name"`
	Category     string         `gorm:"size:80;not null" json:"category"`
	CostPrice    float64        `gorm:"type:decimal(12,2);not null" json:"cost_price_ugx"`
	RetailPrice  float64        `gorm:"type:decimal(12,2);not null" json:"retail_price_ugx"`
	CurrentQty   int            `gorm:"type:integer;not null;default:0" json:"current_qty"`
	MinSafetyQty int            `gorm:"type:integer;not null;default:5" json:"min_safety_qty"`
	ExpiryDate   *time.Time     `json:"expiry_date,omitempty"`
	SupplierName string         `gorm:"size:100" json:"supplier_name"`
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}

type StoreSale struct {
	ID           uuid.UUID      `gorm:"type:uuid;primaryKey" json:"id"`
	BranchID     uuid.UUID      `gorm:"type:uuid;not null" json:"branch_id"`
	CashierID    uuid.UUID      `gorm:"type:uuid;not null" json:"cashier_id"`
	TotalAmount  float64        `gorm:"type:decimal(12,2);not null" json:"total_amount_ugx"`
	Discount     float64        `gorm:"type:decimal(10,2);default:0.0" json:"discount_ugx"`
	PaymentType  string         `gorm:"size:50;not null" json:"payment_type"` // Cash, MobileMoney, POS
	Idempotency  string         `gorm:"size:100;uniqueIndex" json:"idempotency_key"`
	CreatedAt    time.Time      `json:"created_at"`
	Items        []StoreSaleLine `gorm:"foreignKey:SaleID" json:"items"`
}

type StoreSaleLine struct {
	ID         uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	SaleID     uuid.UUID `gorm:"type:uuid;not null" json:"sale_id"`
	ProductID  uuid.UUID `gorm:"type:uuid;not null" json:"product_id"`
	Quantity   int       `gorm:"type:integer;not null" json:"quantity"`
	UnitPrice  float64   `gorm:"type:decimal(12,2);not null" json:"unit_price_ugx"`
	TotalPrice float64   `gorm:"type:decimal(12,2);not null" json:"total_price_ugx"`
}

// ==========================================
// 8. CORPORATE PORTAL & CREDIT SERVICE
// ==========================================

type ContractType string

const (
	ContractPrepaid ContractType = "PREPAID_QUOTA"
	ContractCredit  ContractType = "MONTHLY_CREDIT_LINE"
)

type CorporateContract struct {
	ID             uuid.UUID    `gorm:"type:uuid;primaryKey" json:"id"`
	CompanyName    string       `gorm:"size:150;uniqueIndex;not null" json:"company_name"`
	ContactEmail   string       `gorm:"size:150" json:"contact_email"`
	BillingAddress string       `gorm:"size:255" json:"billing_address"`
	BillingCycle   string       `gorm:"size:30;default:'MONTHLY'" json:"billing_cycle"`
	ContractType   ContractType `gorm:"type:varchar(40);not null" json:"contract_type"`
	CreditLimit    float64      `gorm:"type:decimal(15,2);default:0.0" json:"credit_limit_ugx"`
	CurrentBalance float64      `gorm:"type:decimal(15,2);default:0.0" json:"current_balance_ugx"` // Outstanding debt/prepaid quota
	IsActive       bool         `gorm:"default:true" json:"is_active"`
	ExpiryDate     time.Time    `json:"expiry_date"`
	CreatedAt      time.Time    `json:"created_at"`
	UpdatedAt      time.Time    `json:"updated_at"`
}

// ==========================================
// 9. OFFLINE QUEUE-BASED SYNCHRONIZATION ENGINE
// ==========================================

type SyncStatus string

const (
	SyncPending   SyncStatus = "PENDING"
	SyncSuccess   SyncStatus = "SYNCHRONIZED"
	SyncConflict  SyncStatus = "CONFLICT_ENCOUNTERED"
	SyncRuleError SyncStatus = "REJECTED_VALIDATION"
)

type SyncEvent struct {
	ID           uuid.UUID  `gorm:"type:uuid;primaryKey" json:"id"`
	BranchID     uuid.UUID  `gorm:"type:uuid;not null;index" json:"branch_id"`
	EntityName   string     `gorm:"size:100;not null" json:"entity_name"` // e.g. "fuel_inventory_log", "store_sale"
	EntityID     uuid.UUID  `gorm:"type:uuid;not null;index" json:"entity_id"`
	Operation    string     `gorm:"size:20;not null" json:"operation"`    // INSERT, UPDATE, DELETE
	Payload      string     `gorm:"type:text;not null" json:"payload"`    // JSON serialization
	SeqNumber    int64      `gorm:"type:bigint;autoIncrement" json:"seq_number"`
	Status       SyncStatus `gorm:"type:varchar(30);default:'PENDING'" json:"status"`
	ErrorMessage string     `gorm:"type:text" json:"error_message,omitempty"`
	CreatedAt    time.Time  `json:"created_at"`
	ProcessedAt  *time.Time `json:"processed_at,omitempty"`
}

// ==========================================
// 10. IMMUTABLE ENTERPRISE AUDIT LOGGER
// ==========================================

type AuditRecord struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	UserID    uuid.UUID `gorm:"type:uuid;not null;index" json:"user_id"`
	UserEmail string    `gorm:"size:150" json:"user_email"`
	UserRole  string    `gorm:"size:50" json:"user_role"`
	Action    string    `gorm:"size:150;not null" json:"action"` // e.g. "AUTH_LOGIN_SUCCESS", "FUEL_PRICE_DISPATCH"
	BranchID  *uuid.UUID `gorm:"type:uuid" json:"branch_id,omitempty"`
	IPAddress string    `gorm:"size:45" json:"ip_address"`
	Details   string    `gorm:"type:text" json:"details"` // JSON log of state change
	Timestamp time.Time `gorm:"type:timestamp;not null" json:"timestamp"`
}

// BeforeSave hook to guarantee immutability on audit records
func (a *AuditRecord) BeforeUpdate(tx *gorm.DB) error {
	return gorm.ErrInvalidData // Prevent updating any audit traces
}

func (a *AuditRecord) BeforeDelete(tx *gorm.DB) error {
	return gorm.ErrInvalidData // Prevent dropping audit history
}
