# Kairo 🐉

**Version:** v0.1.0  
**Tagline:** A self-hosted workflow engine for reliable step execution

---

## What is Kairo?

Kairo is a lightweight, self-hosted backend system that allows developers and teams to define workflows as a series of steps and guarantees their execution in order.  
Each step can be an HTTP call or a custom action, and Kairo ensures:

- Steps run in the correct order
- Progress is persisted in the database
- Failures do not lose state
- Execution can resume after crashes

Think of Kairo as a **reliable to-do list for automated processes** — every step is tracked, logged, and executed predictably.

---

## Problem Kairo Solves

Developers often face challenges when automating tasks like:

- CI/CD pipelines
- Webhook orchestration
- Multi-step API calls
- Internal workflow automation

Typical solutions involve ad-hoc scripts, cron jobs, or complex orchestration tools. These approaches are often:

- Hard to track
- Prone to failures
- Difficult to retry or recover
- Not centralized

Kairo solves these problems by providing:

- Persistent workflow and execution state
- Reliable step execution
- Easy API-based triggering
- Developer-first, self-hosted setup

---

## v0.1.0 Scope

v0.1.0 is the **minimal viable version** of Kairo, designed to deliver the core functionality:

### Core Features

- Define a **workflow** with one or more steps
- Trigger a workflow via HTTP (`POST /triggers/<workflow_name>`)
- Execute steps **sequentially**
- Persist workflow and step state in PostgreSQL
- Track execution logs and progress
- Simple Next.js dashboard for **read-only monitoring**
- Docker Compose setup for local development

### Exclusions (v0.1.0)

These will come in future versions:

- Parallel step execution
- Cron or scheduled triggers
- Auth / API keys / RBAC
- Retry policies / exponential backoff
- Slack/email notifications
- Advanced search / analytics
- External cloud hosting (AWS, GCP, etc.)

---

## How to Use (v0.1.0)

1. Clone the repository
2. Start services with Docker Compose (API, Postgres, Redis)
3. Define a workflow in the database
4. Trigger the workflow via HTTP POST
5. Monitor execution progress in the dashboard

---

## Why Kairo Matters

Kairo provides **predictability, durability, and observability** for developers automating multi-step workflows.  
Even in its minimal version, it offers a **safe and structured way to automate tasks**, making your automation more robust and maintainable.

---

## Next Steps for v0.2

- Introduce authentication and API keys
- Retry policies with backoff
- Scheduled/cron triggers
- Webhook integrations
- Parallel steps and DAG support
