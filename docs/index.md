# Kairo Documentation

**Version:** v0.1.0

## Overview

Kairo is a self-hosted workflow engine for reliable step execution. This folder contains project documentation.

## Contents

- [Usage](usage.md) — How to run, trigger workflows, and use the dashboard

## Architecture (v0.1.0)

- **API** — HTTP server that exposes triggers and read-only endpoints for workflows and executions
- **Worker** — Polls for pending executions and runs steps sequentially (stub in v0.1.0)
- **PostgreSQL** — Stores workflows, steps, and execution state
- **Redis** — Reserved for future queue use
- **Frontend** — Next.js read-only dashboard for monitoring workflows and executions

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/triggers/:name` | Trigger a workflow by name; returns `execution_id` |
| GET | `/workflows` | List all workflows |
| GET | `/executions?id=:id` | Get execution by ID (path param in code: `/executions/{id}`) |
| GET | `/executions?workflow_id=:id` | List executions for a workflow |
