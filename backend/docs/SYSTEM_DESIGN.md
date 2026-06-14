# Olayo Petroleum: Enterprise Backend System Specification
**Document Version:** 1.0.0  
**Author:** Solutions Architect / Principal Backend Engineer  
**Language:** Go (Golang 1.24)  
**Primary Database:** PostgreSQL 15+ (With TimescaleDB for Forecourt & Sensor Telemetry)  
**Message Broker & Cache:** Redis 7+

---

## 1. Clean Architecture System Boundaries

The Olayo Petroleum backend is engineered adhering strictly to the **Clean Hexagonal Architecture / Domain-Driven Design (DDD)** standards. Core business policies (Domain Logic) remain completely uncoupled from outer libraries, web routers, databases, or third-party gateways.

```
                  ┌───────────────────────────────────────────────┐
                  │                 INFRASTRUCTURE                │
                  │   - GORM Postgres / Local SQLite DB Drivers   │
                  │   - HTTP Routing (Gin / CORS Middlewares)     │
                  │   - Redis Telemetry Event Broker / Streams    │
                  └───────────────┬───────────────▲───────────────┘
                                  │               │
                  ┌───────────────▼───────────────┴───────────────┐
                  │              ADAPTERS / HANDLERS              │
                  │        - REST API Controller Handlers         │
                  │        - Offline Sync Queue Dispatchers       │
                  │        - Payment Gateway Callbacks            │
                  └───────────────┬───────────────▲───────────────┘
                                  │               │
                  ┌───────────────▼───────────────┴───────────────┐
                  │                BUSINESS LOGIC                 │
                  │        - Hexagonal Service Interfaces         │
                  │        - Domain Handlers (Auth, Logistics)    │
                  │        - Stock Reconciliation Calculations     │
                  └───────────────┬───────────────▲───────────────┘
                                  │               │
                  ┌───────────────▼───────────────┴───────────────┐
                  │                    DOMAIN                     │
                  │        - Enterprise Domain Struct Entities    │
                  │        - Deterministic Audit Tracing Logs     │
                  │        - Immutable Identity Definitions       │
                  └───────────────────────────────────────────────┘
```

### Directory Workspace Layout
```
/backend
├── cmd/
│   └── api/
│       └── main.go                 # Enterprise entrypoint bootstrapper (routes and dependency injection)
├── internal/
│   ├── domain/
│   │   └── models.go               # Unified GORM schema structs & relational definitions
│   ├── repository/
│   │   ├── interfaces.go           # Port definitions for DB interactions (Database-agnostic boundary)
│   │   └── gorm_repos.go           # PostgreSQL & SQLite db GORM implementations
│   ├── service/
│   │   ├── auth.go                 # Crytographic credentials hashing & JWT issuer
│   │   ├── sync_engine.go          # Transaction queue broker for offline edge sync
│   │   ├── payments.go             # Idempotent mobile payments integrations loop (MTN, Airtel, Pesapal)
│   │   └── logistics.go            # Fleets dispatch tracking & GPS geofencing triggers
│   └── api/
│       ├── handlers/               # Gin web handlers & JSON validators
│       └── middleware/             # Jwt authorizations, RBAC grids, and CORS controls
├── pkg/
│   ├── logger/                     # Immutable telemetry event tracers
│   └── tracker/                    # RFID and fuel tank gauges sensor listeners
├── deployments/
│   ├── Dockerfile                  # Lightweight double-stage alpine compilation container
│   ├── docker-compose.yml          # Container configuration for local testing setups
│   └── k8s-manifests.yaml          # Complete replica, StatefulSet, and load ingress definitions
├── docs/
│   └── SYSTEM_DESIGN.md            # Complete enterprise architecture document (this specification)
├── go.mod                          # Golang modules definition
└── Makefile                        # Administrative terminal shortcuts (build, run, test)
```

---

## 2. Relational Entity-Relationship Diagram (ERD) Text Specification

The diagram below defines the database schema relations implemented across GORM and Postgres:

```
+--------------------+            +-------------------+            +-------------------+
|      BRANCHES      |            |     RESERVOIRS    |            |     FUEL_PUMPS    |
+--------------------+            +-------------------+            +-------------------+
| PK | id            |<---+       | PK | id           |<---+       | PK | id            |
|    | name          |    |       | FK | branch_id    |    |       | FK | branch_id     |
|    | code          |    +------0|    | fuel_type    |    +------0| FK | reservoir_id  |
|    | location      |    |       |    | capacity_ltr |            |    | nozzle_code   |
|    | coordinates   |    |       |    | current_vol  |            |    | totalizer_ltr |
|    | plus_code     |    |       |    | low_stk_alrt |            +-------------------+
|    | phone         |    |       +-------------------+                      |
|    | is_active     |    |                                                  |
+--------------------+    |                                                  v
          |               |       +-------------------+            +-------------------+
          |               |       |    INVENTORY_LOG  |            |    STORE_SALES    |
          |               |       +-------------------+            +-------------------+
          +------------+  |       | PK | id           |            | PK | id            |
          |            |  |       | FK | branch_id    |            | FK | branch_id     |
          v            |  |       | FK | reservoir_id |            | FK | cashier_id    |
+--------------------+ |  |       |    | delta_litres |            |    | total_amt_ugx |
|       USERS        | |  |       |    | var_litres   |            |    | payment_type  |
+--------------------+ |  |       +-------------------+            |    | idempotency   |
| PK | id            | |  |                                        +-------------------+
| FK | branch_id     | |  |                                                  |
|    | email         | |  |                                                  v
|    | password_hash | |  |       +-------------------+            +-------------------+
|    | full_name     | |  |       |  TANKER_DELIVERY  |            |  STORE_SALE_LINES |
|    | role          | |  |       +-------------------+            +-------------------+
|    | is_active     | |  |       | PK | id           |            | PK | id            |
+--------------------+ |  |       | FK | tanker_id    |            | FK | sale_id       |
                       |  |       | FK | driver_id    |            | FK | product_id    |
                       |  |       | FK | dest_branch  |            |    | quantity      |
                       |  |       |    | seal_code    |            |    | unit_price    |
                       |  |       |    | cargo_status |            +-------------------+
                       |  |       +-------------------+
                       |  |
                       v  |       +-------------------+            +-------------------+
+--------------------+ |  |       |    WORK_ORDERS    |            |    WASH_RECORDS   |
|    SYNC_EVENTS     | |  |       +-------------------+            +-------------------+
+--------------------+ |  |       | PK | id           |            | PK | id            |
| PK | id            | |  |       | FK | branch_id    |            | FK | branch_id     |
| FK | branch_id     | |  +------0| FK | mechanic_id  |            | FK | attendant_id  |
|    | entity_name   | |          |    | total_cost   |            |    | price_ugx     |
|    | operation     | |          +-------------------+            |    | commission    |
|    | payload (JSON)| |                                           +-------------------+
|    | seq_number    |<+
|    | status        |
+--------------------+
```

---

## 3. Detereministic Role-Based Access Control (RBAC) Layer

Permissions matching core operational routes are verified in the GORM Database. System activities dynamically check against user identity credentials and mapping constants:

### Deterministic Enterprise Permissions Map

| Role | Permitted Context Envelopes | Access Details / Operational Boundaries |
| :--- | :--- | :--- |
| **SUPER_ADMIN** | `all` | Full uninhibited systemic controls. Central architecture modifications. |
| **MANAGING_DIRECTOR** | `reports:read`, `branches:read`, `contracts:*` | High level corporate intelligence reports, audit trails, and financial reviews. |
| **OPERATIONS_MANAGER** | `fuel:*`, `logistics:*`, `branches:telemetry` | National fuel dispatches, depot deliveries, and tank sensor telemetry audits. |
| **BRANCH_MANAGER** | `branch:read`, `fuel:reconcile`, `store:*`, `staff:read` | Localized operational balance controls, variance clearances, and terminal audits. |
| **FUEL_ATTENDANT** | `pumps:read`, `cashier:sale` | Nozzle transactions tracking and mobile payment triggers at selected fuel pump. |
| **MECHANIC** | `garage:read`, `garage:write` | Diagnostic specifications, mechanics logs, parts expenses, and job closures. |
| **STORE_MANAGER** | `store:read`, `store-inventory:write` | Barcode assignments, wholesale inventory intakes, and batch expiry tracing. |
| **CASHIER** | `store:sale`, `payments:process` | Retail point-of-sale invoicing, checkout receipt logging, and cashier reconciliations. |
| **LOGISTICS_MANAGER**| `logistics:write`, `tankers:read` | Tanker asset registry, driver tracking dispatch schedules, and GPS monitorings. |
| **DRIVER** | `logistics:task` | Tanker dispatch execution, cargo delivery receipt confirmations, and secure seals log. |
| **AUDITOR** | `audit:read`, `reports:read` | Reviewing immutable audit-logs, historical fuel ledger transactions, and stock tracking. |
| **CUSTOMER** | `portal:read`, `contracts:usage` | Multi-branch credit usages lookup and active contract balance statements. |

---

## 4. REST API Specification (OpenAPI Endpoint Targets)

All payloads and endpoints parse strict typed json formats matching the domain.

### Auth Module
#### A. Authenticate Local Operator (`POST /api/v1/auth/login`)
- **Payload Request:**
  ```json
  {
    "email": "attendant.tororo@olayopetroleum.com",
    "password": "SecurePasswordHash2026"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "ref_8fdgs7hgd98fa0",
    "expires_in": 86400,
    "user": {
      "id": "7ac168ad-0f9c-49ae-9df3-57bfb3cb40de",
      "email": "attendant.tororo@olayopetroleum.com",
      "full_name": "Wandera Abdul",
      "role": "FUEL_ATTENDANT",
      "branch_id": "1d9f8e4b-6c4a-4d2f-9ee2-421bf76231a4"
    }
  }
  ```

---

### Fuel & Inventory Module
#### B. Submit Tanker Intake at Forecourt (`POST /api/v1/fuel/delivery`)
- **Payload Request:**
  ```json
  {
    "branch_id": "1d9f8e4b-6c4a-4d2f-9ee2-421bf76231a4",
    "reservoir_id": "2dbf77c0-08f3-4e63-88f2-39c811fa1cbe",
    "delivery_id": "93da77db-2da5-423c-a9a3-579cba91122a",
    "litres_delivered": 45000.00,
    "dip_height_after_mm": 2150,
    "carrier_seal_code": "SEAL-TOR-PETROL-889X"
  }
  ```
- **Success Response (221 Created):**
  ```json
  {
    "status": "APPROVED",
    "starting_volume_litres": 5420.50,
    "final_volume_litres": 50420.50,
    "variance_detected": 0.00,
    "audit_log_id": "6fd2a46c-c90a-4fa4-a212-32a2f90aefd9"
  }
  ```

#### C. Perform Daily Tank Reconciliation (`POST /api/v1/fuel/reconcile`)
- **Payload Request:**
  ```json
  {
    "reservoir_id": "2dbf77c0-08f3-4e63-88f2-39c811fa1cbe",
    "opening_stock_litres": 10450.00,
    "stock_delivered_litres": 45000.00,
    "sales_registered_litres": 15400.50,
    "closing_dip_height_litres": 40049.50,
    "actual_closing_litres": 40040.00
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "status": "RECONCILED_WITH_VARIAGE",
    "variance_litres": -9.50,
    "reconciliation_percentage": "99.98%",
    "action_required": "variance_logged_to_auditor"
  }
  ```

---

### Sync Engine API
#### D. Submit Sync Queue Log Bundle (`POST /api/v1/sync/process`)
*(Hitted automatically when branch transitions from offline mode to stable network).*
- **Payload Request (SyncEvent Payload schema):**
  ```json
  {
    "id": "e9fa8b1c-8ff1-45bd-89aa-0bf9daea33d3",
    "branch_id": "1d9f8e4b-6c4a-4d2f-9ee2-421bf76231a4",
    "entity_name": "store_sale",
    "entity_id": "33acbe44-fa31-419b-ab00-defca81211bc",
    "operation": "INSERT",
    "payload": "{\"total_amount_ugx\":250000.0,\"payment_type\":\"POS\",\"idempotency_key\":\"idemp-tor-889a71db\"}",
    "seq_number": 4053
  }
  ```
- **Conflict Response (409 Conflict):**
  ```json
  {
    "error": "SEQUENCE_GAP_DETECTED",
    "highest_received_seq": 4051,
    "resolving_conflict_action": "resubmit_from_checkpoint"
  }
  ```

---

## 5. Offline-First Synchronization Architecture Standard

To guarantee transactional accuracy across Uganda’s border points (which face seasonal latency drops and power grid cuts), Olayo’s backend enforces the **Durable Queue Sync Protocol**:

### Edge Node Operational Life-Cycle

```
┌─────────────────────────────────┐
│     User Action (Purchase)      │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│  Pings cloud endpoint (Check)   │
└────────────────┬────────────────┘
                 ├───────────────────────────────┐
       [NETWORK IS STABLE]               [NETWORK IS DOWN]
                 │                               │
                 ▼                               ▼
┌─────────────────────────────────┐    ┌─────────────────────────────────┐
│ Commit directly to Head Office  │    │ Queue transaction locally in    │
│ Postgres database cache pools   │    │ SQLite database tables          │
└─────────────────────────────────┘    └────────────────┬────────────────┘
                                                        │
                                                        ▼
                                       ┌─────────────────────────────────┐
                                       │ Write domain.SyncEvent with    │
                                       │ PENDING state & sequence value  │
                                       └────────────────┬────────────────┘
                                                        │
                                                        ▼ (Link Restored)
                                       ┌─────────────────────────────────┐
                                       │ Background synchronization loop │
                                       │ pops chronological event pool   │
                                       └────────────────┬────────────────┘
                                                        │
                                                        ▼ (Success)
                                       ┌─────────────────────────────────┐
                                       │ Mark event status: SYNCHRONIZED │
                                       │ in local SQLite databases       │
                                       └─────────────────────────────────┘
```

1. **Local Writes Priority:** All transactions are committed within atomic local SQLite block transactions alongside a generated `SyncEvent` row.
2. **Sequential Checkpointing:** Each branch maintains its own incremental sequence number (`seq_number`). The Head Office logs sequence checkpoints per branch to immediately isolate duplicate transmissions or packet drops.
3. **Graceful Conflict Resolution:** If a transaction payload contains stale item stock counts, the Central Head Office runs an **IDEMPOTENCY HANDLER** to safely merge the store inventory numbers.

---

## 6. Real-Time Telemetry & Event-Driven Loop (Redis Streams)

For high-volume sensors (such as Automatic Tank Gauging levels, GPS coordinates of delivery tankers, and barcode scans), the platform utilizes **Redis Streams** as an event-driven buffer layer:

```
                  ┌───────────────────────────────────────────────┐
                  │          IOT FORECOURT FLUID GAUGES           │
                  └───────────────────────┬───────────────────────┘
                                          │ Post stream event
                                          ▼
                  ┌───────────────────────────────────────────────┐
                  │                 REDIS STREAM:                 │
                  │             "sensor:tank:levels"              │
                  └───────────────────────┬───────────────────────┘
                                          │ Stream consumer loop
                                          ▼
                  ┌───────────────────────────────────────────────┐
                  │            ASYNCHRONOUS GO WORKERS            │
                  │    - Calculates standard volumetric levels    │
                  │    - Compares volumes to physical dip bounds  │
                  └───────────────────────┬───────────────────────┘
                                          │ Emit alerting hooks
                                          ▼
                  ┌───────────────────────────────────────────────┐
                  │             TELEMETRY INTEGRATORS             │
                  │       - Prometheus stock monitoring gauges    │
                  │       - Low stock warnings via SMS push       │
                  └───────────────────────────────────────────────┘
```

### Event Payload Schema: `FuelSoldEvent`
```json
{
  "event_id": "evt_9fa1f97c-9b1b-4682-8fd9-317bfd6201a4",
  "event_type": "FuelSoldEvent",
  "branch_id": "1d9f8e4b-6c4a-4d2f-9ee2-421bf76231a4",
  "timestamp": "2026-06-14T11:42:00Z",
  "data": {
    "pump_id": "5bd122e1-a0a1-422d-88b9-1234ea7bc2e2",
    "nozzle_code": "PUMP01_NZ01",
    "fuel_type": "DIESEL",
    "litres_sold": 150.25,
    "price_per_litre_ugx": 5100.00,
    "total_sale_ugx": 766275.00,
    "payment_method": "MTN_MOMO_PAY",
    "client_idempotency_key": "idemp-0fa871db"
  }
}
```

---

## 7. Automated DevOps, CI/CD Pipeline, and telemetry monitoring

### Enterprise CI/CD Pipeline Layout (`.github/workflows/deploy.yml`)
```yaml
name: Olayo Pipeline CI/CD

on:
  push:
    branches: [ "main", "release/*" ]
  pull_request:
    branches: [ "main" ]

jobs:
  test-and-lint:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Setup Golang Environment
      uses: actions/setup-go@v5
      with:
        go-version: '1.24'
    - name: Run Code Linter
      run: go vet ./...
    - name: Execute Domain Unit Tests
      run: go test -v -coverprofile=coverage.out ./...

  dockerize-and-publish:
    needs: test-and-lint
    if: github.event_name == 'push'
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Authenticate Google Cloud API
      uses: google-github-actions/auth@v2
      with:
        credentials_json: ${{ secrets.GCP_SA_KEY }}
    - name: Configure Docker CLI Credentials
      run: gcloud auth configure-docker
    - name: Compile and Push Container Go Image
      run: |
        docker build -t gcr.io/olayopetroleum/backend:${{ github.sha }} -f deployments/Dockerfile .
        docker push gcr.io/olayopetroleum/backend:${{ github.sha }}

  helm-release:
    needs: dockerize-and-publish
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Trigger Kubernetes Canary Rollout
      run: |
        kubectl set image deployment/olayopetroleum-api go-api=gcr.io/olayopetroleum/backend:${{ github.sha }} -n olayopetroleum-prod
        kubectl rollout status deployment/olayopetroleum-api -n olayopetroleum-prod
```

### Telemetry Performance Targets
To guarantee the highest durability under heavy commuter traffic routes:
- **API Target Latency:** `< 180ms` across Uganda cellular networks.
- **Transactions Limit:** Up to `15,000` concurrent network processes handled via horizontal scaling setups.
- **Sensor Polling Rates:** Forecourt sensor telemetry aggregates every `10` seconds, buffering in Redis streams before PostgreSQL database insertion.
