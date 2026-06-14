# ==========================================
# STAGE 1: COMPILATION BUILD CONTAINER
# ==========================================
FROM golang:1.24-alpine AS builder

# Install build dependencies
RUN apk add --no-cache build-base git

WORKDIR /app

# Copy dependency manifests first for layers caching
COPY go.mod ./
RUN go mod download

# Cache dependencies
COPY . .

# Compile optimized static binary
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build \
    -ldflags="-s -w" \
    -o olayopetroleum-backend cmd/api/main.go

# ==========================================
# STAGE 2: HIGH-AVAILABILITY LIGHTWEIGHT RUN
# ==========================================
FROM alpine:3.21

RUN apk add --no-cache ca-certificates tzdata

WORKDIR /app

# Copy binary from builder stage
COPY --from=builder /app/olayopetroleum-backend .

# Copy documentation resources if required by handlers
COPY --from=builder /app/docs/ /app/docs/

# Create administrative user to run container tasks securely
RUN adduser -D -g '' adminuser
USER adminuser

# Expose microservice access port
EXPOSE 3000

ENV PORT=3000
ENV GIN_MODE=release

CMD ["./olayopetroleum-backend"]
