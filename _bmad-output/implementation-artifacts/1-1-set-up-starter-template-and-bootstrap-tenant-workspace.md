# Story 1.1: Set Up Starter Template and Bootstrap Tenant Workspace

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Platform Engineer,
I want to initialize the monorepo from the approved starter template and bootstrap a tenant workspace,
so that admins can start using an isolated environment on day one.

## Acceptance Criteria

1. Given the project is not yet initialized, when I run the approved starter template command, then the monorepo structure is created with apps/web, apps/api, apps/worker, and shared packages, and base environment configuration files are created.
2. Given required tenant details are provided, when the bootstrap runs, then a tenant record is stored in the public schema and a tenant schema is provisioned, and the initial admin user is associated with that tenant.

## Tasks / Subtasks

- [x] Initialize the monorepo using create-turbo (selected starter) and confirm required apps and packages exist (AC: 1)
  - [x] Run `npx create-turbo@latest` and ensure apps/web, apps/api, apps/worker are present
  - [x] Create or align shared packages: packages/ui, packages/db, packages/shared, packages/config
  - [x] Add base repo config files: turbo.json, pnpm-workspace.yaml, tsconfig.base.json, eslint.config.mjs, .env.example
- [x] Establish app-level environment defaults and shared config pattern (AC: 1)
  - [x] Add `.env.example` files per app (apps/web, apps/api, apps/worker); do not centralize .env at root
  - [x] Use packages/config for shared config values (lint/tsconfig)
- [x] Implement tenant bootstrap flow in the API service (AC: 2)
  - [x] Create tenant module location: apps/api/src/modules/tenant
  - [x] Create a bootstrap script or service that:
    - [x] Inserts tenant record in public schema
    - [x] Provisions tenant schema named `tenant_{id}`
    - [x] Creates initial admin user associated with the tenant
  - [x] Use Prisma for public schema access and raw SQL for schema creation if needed
- [x] Add a documented bootstrap command for local/dev usage (AC: 1, 2)
  - [x] Document required inputs (tenant name, admin email, admin name) and expected outputs

## Dev Notes

### Developer Context
- This story sets the monorepo foundation and creates the first tenant for a schema-per-tenant PostgreSQL setup.
- The selected starter is create-turbo (do not use create-next-app or create-t3-app).
- Public schema stores shared tables; per-tenant schemas are named `tenant_{id}`.

### Technical Requirements
- Node.js LTS v24.12.0, create-turbo 2.7.2, Next.js 16.1.1, Fastify 5.6.2, Prisma 7.2.0, PostgreSQL 18.1.
- Schema-per-tenant isolation must be enforced from the start; no tenant_id-only single schema shortcuts.
- Base API pattern is REST + OpenAPI; errors follow RFC 7807 Problem+JSON (avoid custom error shapes).

### Architecture Compliance
- Monorepo structure must include:
  - apps/web (Next.js UI)
  - apps/api (Fastify API)
  - apps/worker (BullMQ jobs)
  - packages/ui, packages/db, packages/shared, packages/config
- Tenant & Account Management module lives at apps/api/src/modules/tenant.

### Library / Framework Requirements
- create-turbo 2.7.2 is the approved starter.
- If initializing Prisma, use Prisma 7.2.0 with PostgreSQL 18.1.

### File Structure Requirements
- `.env` files exist only at app level (apps/web, apps/api, apps/worker). Shared config goes in packages/config.
- Database naming conventions: tables snake_case plural, columns snake_case, Prisma models PascalCase with @@map/@map.

### Testing Requirements
- Add a basic bootstrap verification test or script:
  - Confirms tenant record exists in public schema
  - Confirms tenant_{id} schema exists
  - Confirms admin user is associated with the tenant

### Project Structure Notes
- Follow the monorepo layout and module boundaries defined in architecture.
- Tenant module path: apps/api/src/modules/tenant.

### References
- Story and ACs: _bmad-output/planning-artifacts/epics.md (Epic 1, Story 1.1)
- Starter choice and versions: _bmad-output/planning-artifacts/architecture.md (Recommended Starter, Core Architectural Decisions)
- Monorepo structure and module boundaries: _bmad-output/planning-artifacts/architecture.md (Project Organization, Project Structure & Boundaries)
- Tenancy model: _bmad-output/planning-artifacts/architecture.md (Tenancy: public schema, tenant_{id})

## Dev Agent Record

### Agent Model Used

GPT-5 (Codex CLI)

### Debug Log References

- /Users/macos/.npm/_logs/2026-01-01T20_09_51_755Z-debug-0.log (npm install failure before Node upgrade)

### Completion Notes List

- Scaffolded create-turbo output in `_turbo-init` and copied into repo root to satisfy monorepo structure.
- Added apps/api (Fastify) and apps/worker (BullMQ) scaffolds, plus tenant bootstrap and verification scripts.
- Added packages/config, packages/db (Prisma schema + adapter), packages/shared, and root config files.
- Added `prisma.config.ts` and updated schema for Prisma 7 config requirements.
- Updated workspace configs, turbo env declaration, and README to document tenant bootstrap.
- Review fixes: moved tenant users into per-tenant schema, added Problem+JSON handling and OpenAPI stub, and clarified env/examples + bootstrap outputs.
- Post-review: tests not re-run after fixes; root `.env.example` now only points to per-app examples.
- Installed dependencies and generated Prisma client.
- Tests run: `npm run check-types --workspace=apps/api`, `npm run lint --workspace=apps/api`, `npm run check-types --workspace=apps/worker`, `npm run lint --workspace=apps/worker`.
- Not run: web/docs lint or typegen (outside bootstrap scope).

### Change Log

- 2026-01-01: Implemented monorepo scaffolding, tenant bootstrap flow, Prisma 7 config, and verification scripts.
- 2026-01-01: Code review fixes for tenant isolation, API error handling, and bootstrap documentation.

### File List

- .env.example
- .gitignore
- .npmrc
- README.md
- eslint.config.mjs
- package.json
- pnpm-workspace.yaml
- tsconfig.base.json
- turbo.json
- prisma.config.ts
- apps/api/.env.example
- apps/api/eslint.config.js
- apps/api/package.json
- apps/api/src/server.ts
- apps/api/src/modules/tenant/bootstrap.ts
- apps/api/src/modules/tenant/bootstrap-cli.ts
- apps/api/src/modules/tenant/verify-bootstrap.ts
- apps/api/src/modules/tenant/index.ts
- apps/api/tsconfig.json
- apps/worker/.env.example
- apps/worker/eslint.config.js
- apps/worker/package.json
- apps/worker/src/index.ts
- apps/worker/tsconfig.json
- apps/web/.env.example
- apps/web/eslint.config.js
- apps/web/package.json
- apps/web/tsconfig.json
- apps/docs/eslint.config.js
- apps/docs/package.json
- apps/docs/tsconfig.json
- packages/config/package.json
- packages/config/eslint/base.js
- packages/config/eslint/next-js.js
- packages/config/eslint/react-internal.js
- packages/config/tsconfig/base.json
- packages/config/tsconfig/nextjs.json
- packages/config/tsconfig/react-library.json
- packages/db/package.json
- packages/db/prisma/schema.prisma
- packages/db/src/index.ts
- packages/shared/package.json
- packages/shared/src/index.ts
- packages/ui/eslint.config.mjs
- packages/ui/package.json
- packages/ui/tsconfig.json
