---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - "/Users/macos/Desktop/Projetos/crm-ai/_bmad-output/planning-artifacts/prd.md"
  - "/Users/macos/Desktop/Projetos/crm-ai/_bmad-output/planning-artifacts/product-brief-falamais-ai-2026-01-01.md"
  - "/Users/macos/Desktop/Projetos/crm-ai/_bmad-output/planning-artifacts/ux-design-specification.md"
  - "/Users/macos/Desktop/Projetos/crm-ai/rascunho.md"
workflowType: 'architecture'
project_name: 'falamais-ai'
user_name: 'Macos'
date: '2026-01-01'
lastStep: 8
status: 'complete'
completedAt: '2026-01-01'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
- Multi-tenant workspace, roles, and tenant isolation across all data.
- WhatsApp connection lifecycle (QR connect, status health, reconnect, alerts).
- Real-time inbox: conversation list, assignment/transfer, filters, history, delivery/read states.
- Media handling for text, audio, image, and documents.
- CRM: leads, tags, stages, custom fields, and conversation linkage.
- AI copilot: intent/sentiment classification, response drafts, approvals, and autonomous actions with audit trail.
- Automation builder: triggers/actions, delay, testing, enable/disable per tenant.
- Handoff and tasks: qualification flow and follow-ups with context.
- Analytics: response time, SLA, AI performance, conversion.
- Governance: audit logs, kill switch, and admin controls.
- Extensibility: inbound webhooks and outbound HTTP actions.
- Onboarding: guided setup + templates.

**Non-Functional Requirements:**
- Low-latency message ingestion and UI updates (real-time UX).
- High availability of WhatsApp gateway and inbox.
- Resilient reconnection + graceful fallback to manual mode.
- Security: encryption in transit/at rest, strict tenant isolation, RBAC.
- LGPD compliance: retention and deletion workflows.
- Observability: logs, metrics, alerts, auditability.
- Scalability: tenant-scoped queues and caching to prevent noisy neighbors.

**Scale & Complexity:**
- Primary domain: full-stack SaaS web app with real-time messaging + AI automation.
- Complexity level: medium (with high-risk domains: real-time, multi-tenant, AI governance).
- Estimated architectural components: 10–12 (gateway, ingestion, realtime, CRM, AI, automations, analytics, auth/RBAC, storage, observability).

### Technical Constraints & Dependencies
- WhatsApp policy constraints: 24h messaging rules, template requirements, rate limits.
- WhatsApp gateway dependency (uazapiGO) with QR session persistence.
- Real-time updates required for inbox and AI suggestions.
- Multi-tenant data isolation and tenant-scoped queues.
- AI provider integration should be pluggable (Groq/Vercel AI SDK suggested in draft).
- Media storage and delivery (MinIO or equivalent).
- **Direction conflict to resolve:** rascunho suggests self-hosted; PRD defines SaaS multi-tenant.

### Cross-Cutting Concerns Identified
- Tenant isolation and RBAC across all entities.
- AI governance: approvals, audit trails, and undo paths.
- Reliability and failover for WhatsApp connectivity.
- Data privacy and compliance (LGPD).
- Observability for message flow, automations, and AI actions.

## Starter Template Evaluation

### Existing Technical Preferences
Based on current project docs, the preferred stack is:
- Next.js (App Router) + Tailwind + shadcn/ui (Nova)
- Prisma + PostgreSQL
- Redis + BullMQ
- Socket.io (real-time)
- NextAuth
- MinIO for media
- Vercel AI SDK + Groq
- uazapiGO (WhatsApp gateway as separate service)

### Current Starter Versions (verified)
- create-next-app: 16.1.1
- next: 16.1.1
- create-t3-app: 7.40.0
- create-turbo: 2.7.2
- shadcn: 3.6.2

### Candidate Starters

**Option A — create-next-app**
- Minimal assumptions, easier to start.
- Good for single app + Docker Compose services.

**Option B — create-t3-app**
- Next.js + Prisma + NextAuth + Tailwind bundled.
- Adds tRPC opinionation.

**Option C — create-turbo (selected)**
- Monorepo foundation with separate apps/services.
- Best fit for web + worker + shared UI packages.
- Supports scaling teams and clearer service boundaries.

### Recommended Starter
Option C — create-turbo (monorepo-first) to align with multi-service architecture.

### Verified CLI Commands
- `npx create-turbo@latest`
- `npx shadcn@latest init`

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Monorepo-first foundation with create-turbo 2.7.2.
- Multi-tenant isolation using schema-per-tenant (PostgreSQL).
- Separate API service (Fastify 5.6.2) + Next.js BFF.
- REST + OpenAPI as the primary API pattern.
- Auth.js v5 with DB sessions for SaaS control.
- Async processing via BullMQ (5.66.4) + Redis (8.4.0).
- Realtime via Socket.io (4.8.3).
- VPS + Docker Compose deployment baseline.
- Observability with Prometheus/Grafana + Sentry + structured logs.

**Important Decisions (Shape Architecture):**
- PostgreSQL 18.1 with Prisma 7.2.0 migrations.
- Zod 4.3.4 for validation across API/UX.
- Media storage via MinIO (RELEASE.2025-10-15T17-29-55Z).
- Frontend stack: Next.js 16.1.1 + React 19.2.3 + shadcn/ui (Nova) + Tailwind 4.1.18.
- Client state/data: Zustand 5.0.9 + React Query 5.90.16.
- Forms: React Hook Form 7.69.0 + @hookform/resolvers 5.2.2.
- Errors standardized via RFC 7807 Problem+JSON.

**Deferred Decisions (Post-MVP):**
- Kubernetes migration.
- DB-per-tenant or sharded Postgres.
- GraphQL adoption.
- Multi-channel beyond WhatsApp.

### Data Architecture
- **Database:** PostgreSQL 18.1 (schema-per-tenant).
- **ORM & Migrations:** Prisma 7.2.0 / Prisma Migrate.
- **Validation:** Zod 4.3.4 shared between API and UI.
- **Caching & Sessions:** Redis 8.4.0.
- **Queues & Async:** BullMQ 5.66.4 for message ingestion, AI tasks, automation triggers.
- **Media Storage:** MinIO RELEASE.2025-10-15T17-29-55Z.
- **Auditability:** dedicated audit log tables for AI actions and admin changes.

### Authentication & Security
- **Auth:** Auth.js v5 (pre-release) with `@auth/core` 0.34.3 and `@auth/nextjs` pre-release.
- **Session:** DB sessions for revocation and tenant control.
- **Password Hashing:** bcrypt 6.0.0.
- **RBAC:** API middleware + policy checks (tenant-aware).
- **API/Webhooks:** Redis rate limiting + HMAC signatures.
- **Encryption:** in transit (TLS) and at rest (DB + object storage).

### API & Communication Patterns
- **API Layer:** Fastify 5.6.2 as dedicated service.
- **BFF:** Next.js route handlers for UI-facing APIs.
- **External API Pattern:** REST + OpenAPI.
- **Docs:** Swagger UI.
- **Error Format:** RFC 7807 Problem+JSON.
- **Inter-service:** HTTP sync + BullMQ async.
- **Realtime:** Socket.io 4.8.3 with tenant-scoped rooms.

### AI Response Contract and Rollback Model
- **AI Suggestion Contract:** Standardized payload for UI and auditability.
  - `suggestionId`, `tenantId`, `conversationId`, `messageId`
  - `type`: `reply_draft` | `action_suggestion`
  - `confidence` (0-1) and `rationale` (short text)
  - `suggestedText` for drafts or `actionPlan` for actions
  - `createdAt`, `expiresAt`, `status`: `pending` | `applied` | `rejected` | `expired`
- **Action Execution Contract:** When approved, the action emits:
  - `actionId`, `actionType`, `targetEntity`, `targetId`
  - `executionStatus`: `queued` | `running` | `completed` | `failed`
  - `undoWindowSeconds` (0 if not reversible)
- **Rollback Model:** Store reversible actions with:
  - `actionId`, `reversalPayload` (JSON), `undoDeadline`, `undoStatus`
  - `undoStatus`: `available` | `executed` | `expired`
- **Rules:** Actions without a reliable reversal must require explicit confirmation and never auto-execute. UI uses `confidence`, `rationale`, and `undoWindowSeconds` to show transparency and control.

### Frontend Architecture
- **Framework:** Next.js 16.1.1 (App Router) + React 19.2.3.
- **UI System:** shadcn/ui (Nova) + Tailwind 4.1.18.
- **Client State:** Zustand 5.0.9.
- **Server State:** React Query 5.90.16.
- **Forms:** React Hook Form 7.69.0 + Zod 4.3.4.
- **Realtime UX:** socket events trigger query invalidation + UI updates.
- **Performance Baselines:** cursor pagination for conversations/messages, list virtualization for inbox/thread, and incremental rendering for large histories.

### Infrastructure & Deployment
- **Deploy Target:** VPS + Docker Compose (use `docker compose` v2.39.2).
- **CI/CD:** GitHub Actions with Docker build/push + SSH deploy.
- **Observability:** Prometheus + Grafana + alerts; Sentry 10.32.1 for app errors.
- **Logging:** Pino 10.1.0 (JSON structured).
- **Runtime:** Node.js LTS v24.12.0 for services.
- **Storage:** MinIO on VPS (S3-compatible).

### Decision Impact Analysis
- Schema-per-tenant drives migration tooling, tenancy routing, and query scoping.
- Dedicated API service isolates webhook load and reduces UI coupling.
- Async queue is required for message ingestion, AI tasks, and automation retries.
- Real-time layer implies tenant-scoped rooms and backpressure handling.
- VPS baseline keeps cost low but requires disciplined observability and backups.

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined
**Critical Conflict Points Identified:** 6 areas (naming, structure, formats, communication, process, logging).

### Naming Patterns

**Database Naming Conventions:**
- Tables: plural, snake_case (e.g., leads, conversations, messages).
- Columns: snake_case (e.g., lead_id, created_at).
- Foreign keys: {table}_id (e.g., conversation_id).
- Indexes: idx_{table}_{column} (e.g., idx_messages_conversation_id).
- Prisma: model names PascalCase; map to snake_case via `@@map` / `@map`.
- Tenancy: `public` schema for shared tables; per-tenant schemas named `tenant_{id}`.

**API Naming Conventions:**
- REST endpoints are plural: `/api/v1/leads`, `/api/v1/conversations/{id}`.
- Route params: `{id}` in docs; `:id` in code.
- Query params: camelCase (e.g., `stageId`, `createdAfter`).
- Headers: `X-Request-Id`, `X-Tenant-Id` (when needed).
- JSON fields: camelCase.

**Code Naming Conventions:**
- Components: PascalCase (e.g., `ConversationListItem`).
- Component files: kebab-case (e.g., `conversation-list-item.tsx`).
- Functions/variables: camelCase.
- Constants: SCREAMING_SNAKE_CASE.
- Env vars: UPPER_SNAKE_CASE.

### Structure Patterns

**Project Organization (Monorepo):**
- apps/web (Next.js UI)
- apps/api (Fastify API)
- apps/worker (BullMQ jobs)
- packages/ui (shadcn + shared components)
- packages/db (Prisma schema + migrations)
- packages/shared (types, utilities, validators)
- packages/config (eslint/tsconfig/shared)

**Tests:**
- Unit tests co-located: `*.test.ts(x)`
- E2E tests: `apps/web/e2e` and `apps/api/e2e`

**Config & Assets:**
- `.env` only at app level; shared config via `packages/config`.
- Static assets under `apps/web/public`.

### Format Patterns

**API Response Format:**
- Success: `{ data, meta }`
- Error: RFC 7807 Problem+JSON
  - `{ type, title, status, detail, instance }`

**Dates & Times:**
- ISO 8601 strings in UTC (`2025-01-01T12:00:00Z`).

**Booleans & Nulls:**
- Use `true/false`; avoid 0/1.
- Omit optional fields instead of `null` when possible.

### Communication Patterns

**Socket Events:**
- Event naming: dot.case (e.g., `conversation.message.created`).
- Rooms: `tenant:{tenantId}`, `conversation:{id}`.
- Payloads: camelCase, include `tenantId`, `requestId`.

**Queue Jobs (BullMQ):**
- Job naming: dot.case (e.g., `ai.analyze`, `automation.execute`).
- Idempotency: use `messageId` or `eventId` as dedupe keys.
- Retries: exponential backoff for idempotent jobs only.

### Process Patterns

**Validation:**
- Zod at API boundary.
- Prisma constraints for critical fields (unique, not null).

**Error Handling:**
- Central error handler returns Problem+JSON.
- Client shows friendly message + retry action when possible.

**Loading States:**
- Skeleton for lists + message thread.
- Keep previous data for real-time views to prevent flicker.

### Logging Patterns
- Structured JSON logs via Pino.
- Required fields: `level`, `msg`, `requestId`, `tenantId`, `userId`, `service`.
- Correlation: propagate `X-Request-Id` across services.

## Project Structure & Boundaries

### Requirements Mapping (FR Categories → Modules)

- Tenant & Account Management → apps/api/src/modules/tenant, apps/web/src/app/settings/tenant
- User & Role Management → apps/api/src/modules/users, apps/web/src/app/settings/users
- WhatsApp Connection & Health → apps/api/src/modules/whatsapp, apps/web/src/app/onboarding
- Inbox & Conversation Management → apps/api/src/modules/inbox, apps/web/src/app/inbox
- Messaging & Media → apps/api/src/modules/messages, apps/worker/src/jobs/media
- Leads & CRM → apps/api/src/modules/crm, apps/web/src/app/crm
- AI Copilot & Decision Support → apps/api/src/modules/ai, apps/worker/src/jobs/ai
- Automation & Workflow Builder → apps/api/src/modules/automation, apps/worker/src/jobs/automation, apps/web/src/app/automations
- Handoff & Tasks → apps/api/src/modules/tasks, apps/web/src/app/tasks
- Analytics & Reporting → apps/api/src/modules/analytics, apps/web/src/app/analytics, apps/worker/src/jobs/analytics
- Governance & Audit → apps/api/src/modules/audit, apps/web/src/app/settings/audit
- Integrations & Extensibility → apps/api/src/modules/integrations
- Onboarding & Templates → apps/api/src/modules/onboarding, apps/web/src/app/onboarding

### Project Directory Structure (Monorepo)

```
falamais-ai/
├── README.md
├── package.json
├── turbo.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── eslint.config.mjs
├── .env.example
├── .gitignore
├── apps/
│   ├── web/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── globals.css
│   │   │   ├── page.tsx
│   │   │   ├── inbox/
│   │   │   ├── crm/
│   │   │   ├── automations/
│   │   │   ├── analytics/
│   │   │   ├── tasks/
│   │   │   ├── onboarding/
│   │   │   └── settings/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── inbox/
│   │   │   ├── crm/
│   │   │   └── ai/
│   │   ├── lib/
│   │   │   ├── api-client.ts
│   │   │   ├── auth.ts
│   │   │   └── socket.ts
│   │   ├── hooks/
│   │   ├── styles/
│   │   ├── middleware.ts
│   │   └── public/
│   ├── api/
│   │   ├── src/
│   │   │   ├── server.ts
│   │   │   ├── plugins/
│   │   │   │   ├── auth.ts
│   │   │   │   ├── db.ts
│   │   │   │   ├── redis.ts
│   │   │   │   └── openapi.ts
│   │   │   ├── routes/
│   │   │   │   └── v1/
│   │   │   ├── modules/
│   │   │   │   ├── tenant/
│   │   │   │   ├── users/
│   │   │   │   ├── whatsapp/
│   │   │   │   ├── inbox/
│   │   │   │   ├── messages/
│   │   │   │   ├── crm/
│   │   │   │   ├── ai/
│   │   │   │   ├── automation/
│   │   │   │   ├── tasks/
│   │   │   │   ├── analytics/
│   │   │   │   ├── audit/
│   │   │   │   └── integrations/
│   │   │   ├── middlewares/
│   │   │   ├── utils/
│   │   │   └── validators/
│   │   └── tests/
│   └── worker/
│       ├── src/
│       │   ├── index.ts
│       │   ├── queues/
│       │   ├── jobs/
│       │   │   ├── ai/
│       │   │   ├── automation/
│       │   │   ├── messaging/
│       │   │   ├── analytics/
│       │   │   └── media/
│       │   └── utils/
│       └── tests/
├── packages/
│   ├── ui/
│   │   ├── components/
│   │   └── styles/
│   ├── db/
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   └── client/
│   ├── shared/
│   │   ├── types/
│   │   ├── events/
│   │   ├── constants/
│   │   └── validators/
│   ├── config/
│   │   ├── eslint/
│   │   └── tsconfig/
│   └── observability/
│       ├── logger.ts
│       └── tracing.ts
├── infra/
│   ├── docker-compose.yml
│   ├── nginx/
│   │   └── nginx.conf
│   ├── prometheus/
│   │   └── prometheus.yml
│   ├── grafana/
│   │   └── provisioning/
│   └── scripts/
└── docs/
    ├── api/
    └── architecture/
```

### Integration Boundaries

**API Boundaries:**
- apps/api is the only public API for external integrations and webhooks.
- apps/web uses BFF endpoints for UI needs; no direct DB access.
- apps/worker processes async jobs; communicates via BullMQ only.

**Component Boundaries:**
- UI components live in packages/ui; apps/web composes them.
- Business logic resides in apps/api/modules.
- Shared types and events live in packages/shared.

**Data Boundaries:**
- Schema-per-tenant in PostgreSQL; `public` schema for shared tables.
- Access to DB via packages/db Prisma client only.
- Cache and queues via Redis/BullMQ.

### Requirement-to-Structure Map (Examples)
- FR13–FR20 Inbox/Messaging → apps/api/modules/inbox + apps/web/app/inbox
- FR21–FR24 CRM → apps/api/modules/crm + apps/web/app/crm
- FR25–FR29 AI → apps/api/modules/ai + apps/worker/jobs/ai + apps/web/components/ai
- FR30–FR33 Automation → apps/api/modules/automation + apps/worker/jobs/automation + apps/web/app/automations
- FR39–FR41 Governance → apps/api/modules/audit + apps/web/app/settings/audit

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
- Stack choices are compatible (Next.js + React + Fastify + Prisma + Redis + BullMQ + Socket.io).
- Patterns (naming, responses, events) align with API and frontend choices.
- Monorepo structure supports separation of concerns and service boundaries.

**Pattern Consistency:**
- Naming conventions are consistent across DB/API/code.
- Error and response formats are standardized (RFC 7807, `{ data, meta }`).
- Event/job naming aligns with logging and tracing.

**Structure Alignment:**
- Directory structure maps directly to FR categories.
- Boundaries are explicit (web vs api vs worker).
- Shared packages centralize types and utilities.

### Requirements Coverage Validation ✅

**Epic/Feature Coverage:**
- All FR categories map to explicit modules and UI surfaces.
- Real-time, AI, automation, and CRM flows have clear architectural support.

**Functional Requirements Coverage:**
- Covered via API modules + worker jobs + UI surfaces.
- WhatsApp ingestion, messaging, and AI action flow are supported.

**Non-Functional Requirements Coverage:**
- Performance: realtime + queues + caching.
- Security: RBAC, rate limiting, HMAC, encryption at rest/in transit.
- Scalability: tenant-scoped schemas + queues.
- Compliance: LGPD aligned retention and audit logging.

### Implementation Readiness Validation ✅

**Decision Completeness:**
- All critical decisions documented with versions.
- Clear patterns for API, logging, and async processing.

**Structure Completeness:**
- Monorepo layout and boundaries are explicit.
- Integration points and ownership are clear.

**Pattern Completeness:**
- Naming, format, communication, and process patterns are defined.

### Gap Analysis Results

**Important Gaps (address soon):**
- **Auth.js v5 is pre-release** → define fallback to NextAuth v4 if stability issues.
- **uazapiGO version not pinned** → choose a concrete Docker image/tag.
- **Schema-per-tenant with Prisma** → define schema routing strategy and migration flow.
- **Tenant resolution strategy** for inbound webhooks (X-Tenant-Id vs lookup by WhatsApp number).
- **Backup/DR** for Postgres + MinIO not specified.

**Nice-to-Have Gaps (later):**
- OpenAPI versioning policy (v1/v2 cadence).
- Event versioning for Socket/Queue payloads.
- Explicit data retention schedules per tenant.

### Validation Issues Addressed
- None required during validation; gaps are documented for follow-up.

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**✅ Architectural Decisions**
- [x] Critical decisions documented with versions
- [x] Technology stack fully specified

**✅ Patterns & Structure**
- [x] Consistency rules defined
- [x] Project structure mapped to requirements
- [x] Service boundaries documented

## Architecture Completion Summary

### Workflow Completion

**Architecture Decision Workflow:** COMPLETED ✅  
**Total Steps Completed:** 8  
**Date Completed:** 2026-01-01  
**Document Location:** _bmad-output/planning-artifacts/architecture.md

### Final Architecture Deliverables

**📋 Complete Architecture Document**

- All architectural decisions documented with specific versions
- Implementation patterns ensuring AI agent consistency
- Complete project structure with all files and directories
- Requirements to architecture mapping
- Validation confirming coherence and completeness

**🏗️ Implementation Ready Foundation**

- 20 architectural decisions made
- 6 implementation pattern categories defined
- 12 architectural components specified
- 45 requirements fully supported

**📚 AI Agent Implementation Guide**

- Technology stack with verified versions
- Consistency rules that prevent implementation conflicts
- Project structure with clear boundaries
- Integration patterns and communication standards

### Implementation Handoff

**For AI Agents:**  
This architecture document is your complete guide for implementing falamais-ai. Follow all decisions, patterns, and structures exactly as documented.

**First Implementation Priority:**  
`npx create-turbo@latest`

**Development Sequence:**

1. Initialize project using the documented starter template
2. Set up development environment per architecture
3. Implement core architectural foundations
4. Build features following established patterns
5. Maintain consistency with documented rules

### Quality Assurance Checklist

**✅ Architecture Coherence**
- [x] Decisions compatible and non-conflicting
- [x] Patterns align with tech stack
- [x] Structure supports boundaries

**✅ Requirements Coverage**
- [x] Functional requirements supported
- [x] Non-functional requirements addressed
- [x] Cross-cutting concerns handled
