.PHONY: build run test migrate up down lint

build:
	go build -o bin/api ./cmd/api

run:
	go run ./cmd/api

test:
	go test ./...

migrate:
	go run ./cmd/api migrate 2>/dev/null || (cd internal/db && go run . migrate)

up:
	docker compose -f docker/docker-compose.yml up -d

down:
	docker compose -f docker/docker-compose.yml down

lint:
	golangci-lint run ./...
