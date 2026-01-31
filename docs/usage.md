# How to Use Kairo

## Prerequisites

- Go 1.22+
- Node.js 18+ (for frontend)
- Docker & Docker Compose (optional, for full stack)

## 1. Clone and configure

```bash
git clone <repo-url>
cd kairo
cp .env.example .env
# Edit .env if needed (PORT, DATABASE_URL, etc.)
```

## 2. Start services (Docker)

```bash
make up
# or: docker compose -f docker/docker-compose.yml up -d
```

This starts:

- **API** on http://localhost:8080
- **PostgreSQL** on localhost:5432 (user/pass: kairo/kairo, db: kairo)
- **Redis** on localhost:6379

## 3. Run migrations

If you run the API locally (not only via Docker), run migrations once so the schema exists:

```bash
# From repo root; migrations read ./migrations/001_init.sql
make migrate
# or run the API once; it runs Migrate on startup
make run
```

With Docker, the API container runs migrations on startup if you wire it that way, or run a one-off migrate step.

## 4. Define a workflow

Insert a workflow and steps (e.g. via `psql` or any Postgres client):

```sql
INSERT INTO workflows (name) VALUES ('my-workflow') RETURNING id;
-- Use the returned id:
INSERT INTO steps (workflow_id, order_index, name, action, config)
VALUES
  ('<workflow-uuid>', 0, 'step1', 'http', '{"url":"https://httpbin.org/get","method":"GET"}'),
  ('<workflow-uuid>', 1, 'step2', 'http', '{"url":"https://httpbin.org/post","method":"POST"}');
```

## 5. Trigger a workflow

```bash
curl -X POST http://localhost:8080/triggers/my-workflow
```

Response example: `{"execution_id":"<uuid>"}`

## 6. Monitor in the dashboard

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000 and use the dashboard to view workflows and execution logs (read-only).

## Local development without Docker

1. Start Postgres and Redis locally (or use Docker only for them).
2. Set `DATABASE_URL` and `REDIS_URL` in `.env`.
3. Run `make migrate` then `make run` for the API.
4. Run the frontend as above.

## Troubleshooting

- **Migration fails:** Ensure Postgres is up and `DATABASE_URL` is correct; run from repo root so `migrations/001_init.sql` is found.
- **Trigger returns 404:** Workflow name must match exactly; check `SELECT * FROM workflows;`.
- **API won’t start:** Check port 8080 is free and `go mod tidy` then `go build ./cmd/api`.
