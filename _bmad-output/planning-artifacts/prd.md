---
stepsCompleted: [1, 2, 3, 4, 6, 7, 8, 9, 10, 11]
inputDocuments:
  - "/Users/macos/Desktop/Projetos/crm-ai/_bmad-output/planning-artifacts/product-brief-falamais-ai-2026-01-01.md"
documentCounts:
  briefs: 1
  research: 0
  brainstorming: 0
  projectDocs: 0
workflowType: 'prd'
lastStep: 11
---

# Product Requirements Document - falamais-ai

**Author:** Macos
**Date:** 2026-01-01

## Executive Summary

falamais-ai is a multi-tenant SaaS that connects WhatsApp to an agentic AI copilot, unifying real-time inbox, CRM, and automation so non-technical teams can respond faster, follow up consistently, and make better decisions during sales and support conversations.

### What Makes This Special

The differentiator is an agentic AI that can execute real CRM actions (function-calling) and guide operators in live conversations, with a unified workflow across inbox, CRM, and automations — removing technical setup and operational guesswork.

## Project Classification

**Technical Type:** saas_b2b
**Domain:** general
**Complexity:** medium
**Project Context:** Greenfield - new project

Classification signals: SaaS, platform, multi-tenant, teams, dashboard, web app.

## Success Criteria

### User Success
- Tenant-defined goals set during onboarding (e.g., response SLAs, AI usage targets)
- Core user metrics tracked per tenant: first response time, SLA compliance rate, AI suggestion acceptance, AI qualification accuracy, automated follow-up completion, CSAT, missed-conversation rate
- Success is achieved when tenant-configured goals are consistently met and manual effort is reduced

### Business Success
- Activation: tenants connect WhatsApp and reach first automation execution
- Adoption: weekly active operators and active automations per tenant
- Retention: sustained usage over time and low churn
- Efficiency: reduced manual handling time per conversation

### Technical Success
- High availability of WhatsApp gateway and real-time inbox
- Low-latency message ingestion and UI updates
- Reliable automation execution with low error rates
- Scalable multi-tenant performance with strict data isolation
- Strong observability (logs, audit trail, alerts)

### Measurable Outcomes
- % of conversations within tenant-defined SLA
- p95 response time and p95 UI update latency
- AI action success rate and automation completion rate
- Tenant activation rate and time-to-first-value
- Weekly active operators per tenant

## Product Scope

### MVP - Minimum Viable Product
- WhatsApp connection with full media support (text, audio, images, documents) and webhooks
- Real-time inbox with conversation statuses, assignment, and history
- Contacts/Leads management with configurable funnel (kanban)
- Agentic AI copilot for suggestions + autonomous actions (with approvals and audit log)
- Essential automation builder (triggers + basic actions like send message, update CRM, delay)
- Multi-tenant SaaS foundation with roles and permissions
- Basic analytics for response time, conversion, and AI performance
- Secure authentication and data handling

### Growth Features (Post-MVP)
- Multi-channel beyond WhatsApp (Instagram, email, etc.)
- Deep CRM integrations (Salesforce, HubSpot, SAP)
- Marketplace for templates/flows
- Mobile native apps
- Advanced AI modules (RAG knowledge base, predictive best-time-to-contact, complex forecasting)
- Enterprise SSO and custom compliance frameworks

### Vision (Future)
- Multi-channel inbox (WhatsApp + email + social)
- Template marketplace and industry-specific playbooks
- Advanced AI orchestration across sales/marketing/CS
- Predictive analytics and proactive automation at scale
- Mobile companion apps and partner ecosystem

## User Journeys

**Journey 1: Ana (Front-Desk Coordinator) — Closing the First Sale**
Ana manages inbound WhatsApp inquiries for a clinic while juggling scheduling and front-desk tasks. She connects the clinic's WhatsApp, and the inbox starts receiving messages in real time. A new lead asks about pricing and availability. The AI classifies intent as "sales," suggests a response with available slots, and drafts a follow-up. Ana approves with one click, and the lead moves to the "Qualified" funnel stage automatically. The customer books a visit the same day.

**Aha moment:** The first AI-assisted reply that moves a lead forward and updates the funnel without manual steps.  
**What can go wrong:** WhatsApp disconnects or an AI suggestion is off.  
**Recovery:** Connection alerts + fallback to manual mode, AI suggestion feedback, and a clear audit trail.

**Journey 2: Lucas (SDR) — Qualify and Handoff to Inside Sales**
Lucas receives a burst of leads from WhatsApp campaigns. The AI auto-tags cold vs. warm leads, scores intent, and routes the hottest leads for quick follow-up. He reviews AI summaries, asks a few qualifying questions, and marks qualified leads for Inside Sales. The handoff includes context, conversation history, and suggested next steps, reducing friction for the closer.

**Aha moment:** The AI accurately identifies a hot lead and prepares the handoff in seconds.  
**What can go wrong:** Duplicate leads or wrong qualification.  
**Recovery:** Manual override, lead merge tools, and AI feedback loop to improve scoring.

**Journey 3: Carla (Small Business Owner) — Setup and First Automation**
Carla runs a small business and responds personally to WhatsApp messages. During onboarding, she connects WhatsApp, chooses a simple funnel, and selects a template for "new lead follow-up." She writes a short message, and the AI suggests improvements. The first automation triggers after a lead goes silent, and a follow-up message brings the lead back.

**Aha moment:** The first automated follow-up that recovers a conversation without extra effort.  
**What can go wrong:** Onboarding confusion or too many configuration choices.  
**Recovery:** Guided setup, defaults per industry, and human-approval mode by default.

**Journey 4: Marco (Manager/Admin) — Governance and Performance**
Marco manages a team of agents. He configures role permissions, sets approval rules for AI actions, and monitors dashboards. He sees a drop in response time and higher conversion after enabling AI suggestions. When a spike in error rate occurs, he pauses a specific automation and reviews the audit log.

**Aha moment:** Seeing a measurable reduction in response time and increased conversion after enabling AI.  
**What can go wrong:** Automation misfires or policy violations.  
**Recovery:** Approval workflows, kill switch, audit logs, and configurable thresholds.

### Journey Requirements Summary

These journeys reveal required capabilities:
- Guided onboarding and WhatsApp connection with health checks
- Real-time inbox with AI suggestions and approval flow
- Lead scoring, tagging, and funnel stage automation
- Handoff workflow with context for Inside Sales
- Automation builder with templates and safe defaults
- Role-based access control and admin governance
- Audit logs, alerting, and manual override
- Analytics for response time, conversion, and AI performance

## Innovation & Novel Patterns

### Detected Innovation Areas
- Agentic AI with system actions: AI can execute real CRM operations (function-calling) rather than only suggesting text.
- Unified workflow surface: inbox + CRM + automation in one continuous flow, reducing handoffs and context loss.
- Low-tech orchestration: natural-language intent driving automation and CRM updates without technical setup.

### Market Context & Competitive Landscape
Most existing solutions focus on messaging (Chatwoot) or automation (n8n/Zapier) but lack a unified agentic layer that both recommends and executes CRM actions in real time. The innovation is the operational "copilot" experience, not just another chatbot.

### Validation Approach
- Pilot with a small cohort of tenants to measure AI action success rate and SLA compliance
- A/B compare AI-assisted vs. manual flows for response time and conversion
- Progressive rollout of autonomous actions with approvals, then expand autonomy when accuracy is proven

### Risk Mitigation
- Human-approval mode by default with clear audit logs
- Kill switch per automation and per tenant
- Fallback to manual operations on AI errors or WhatsApp instability
- Feedback loop to retrain/adjust policies and scoring thresholds

## SaaS B2B Specific Requirements

### Project-Type Overview
falamais-ai is a multi-tenant SaaS for WhatsApp operations, combining real-time inbox, CRM, and automation with agentic AI actions.

### Technical Architecture Considerations
- Strict tenant isolation at data and access layers
- Real-time events per tenant with scoped subscriptions
- Auditable AI actions with rollback/override capability
- Scalable queueing for automation and AI processing

### Tenant Model
- Each tenant has isolated data, configurations, and permissions
- Tenant-specific WhatsApp connections and automation rules
- Per-tenant analytics and dashboards

### RBAC Matrix
- Admin: full access, user management, settings
- Manager: automation + analytics + team oversight
- Agent: inbox + assigned leads + AI suggestions
- Viewer: read-only analytics

### Subscription Tiers
- TBD (initial proposal: Trial -> Pro -> Business/Enterprise)
- Tier differences may include: number of agents, active automations, message volume, AI usage limits

### Integration List
- WhatsApp gateway (uazapiGO) as core integration
- Optional integrations: Shopify/WooCommerce, Stripe/Mercado Pago, Google Calendar/Calendly, SendGrid
- Webhooks + HTTP action node for extensibility

### Compliance Requirements
- LGPD-aligned data handling
- Audit logs for AI actions and admin changes
- Encryption at rest and in transit
- Rate limiting and abuse prevention

### Implementation Considerations
- Multi-tenant schemas or tenant_id strategy in DB
- Tenant-aware caching and queue isolation
- Operational tooling for tenant health and WhatsApp connection status

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Platform + Experience  
**Resource Requirements:** Full-stack (web + realtime), AI/automation, backend infra, product/UX

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**
- Secretária fechando venda com IA no inbox
- SDR qualificando e handoff para Inside Sales
- Dono de pequeno negócio configurando e rodando automações
- Gestor/Admin governando IA e acompanhando métricas

**Must-Have Capabilities:**
- Real-time WhatsApp inbox with full media support
- AI suggestions + approvals + audit log
- Lead scoring, tagging, funnel stages and handoff flows
- Automation builder with templates and safe defaults
- Multi-tenant RBAC and tenant isolation
- Basic analytics for response time, conversion, AI performance

### Post-MVP Features

**Phase 2 (Post-MVP):**
- Advanced analytics and reporting
- Deeper industry templates and playbooks
- Expanded integrations (e-commerce, payments, calendars)

**Phase 3 (Expansion):**
- Multi-channel inbox (email/social)
- Marketplace for templates/flows
- Advanced AI modules (RAG, predictive optimization)
- Mobile companion apps and partner ecosystem

### Risk Mitigation Strategy

**Technical Risks:**  
- AI action accuracy and WhatsApp reliability -> approval mode, audit logs, fallback manual flow  
- Scale and realtime -> tenant-scoped events, queue isolation, observability

**Market Risks:**  
- Users don't trust automation -> gradual autonomy, transparent suggestions, measurable wins  
- Adoption friction -> guided onboarding + templates

**Resource Risks:**  
- Over-scope launch -> enforce phased roadmap and limit non-core features

## Functional Requirements

### Tenant & Account Management
- FR1: Admin can create and configure a tenant workspace.
- FR2: Admin can manage tenant settings (branding, business info).
- FR3: System enforces tenant data isolation across all entities.
- FR4: Admin can deactivate a tenant and revoke access.

### User & Role Management
- FR5: Admin can invite and manage users within a tenant.
- FR6: Admin can assign roles (Admin, Manager, Agent, Viewer).
- FR7: Managers can manage team assignments within their scope.
- FR8: Users can view and update their own profile.

### WhatsApp Connection & Health
- FR9: Admin can connect a WhatsApp account to a tenant.
- FR10: System can show WhatsApp connection status and health.
- FR11: Admin can reconnect or disconnect a WhatsApp account.
- FR12: System can alert users when WhatsApp connection fails.

### Inbox & Conversation Management
- FR13: Agents can view real-time conversation lists and statuses.
- FR14: Agents can open a conversation and view full history.
- FR15: Agents can assign or transfer conversations.
- FR16: Agents can filter conversations by status, tags, or assignee.
- FR17: System can maintain a conversation timeline of actions and events.

### UX Efficiency (Derived)
- DR1: Desktop users can use keyboard shortcuts for inbox navigation and primary actions (next/previous conversation, focus search, send reply, apply status/tag).
- DR2: Users can open a quick switcher to jump to conversations, leads, or settings without losing context.

### Messaging & Media Handling
- FR18: Agents can send and receive text messages.
- FR19: Agents can send and receive media (images, audio, documents).
- FR20: System can track delivery/read status per message.

### Leads & CRM Management
- FR21: Users can create, view, and edit lead profiles.
- FR22: Users can move leads across funnel stages.
- FR23: Users can tag leads and manage custom fields.
- FR24: System can associate conversations with leads.

### AI Copilot & Decision Support
- FR25: System can classify intent and sentiment for incoming messages.
- FR26: System can generate AI response suggestions for agents.
- FR27: Agents can approve, edit, or reject AI suggestions.
- FR28: System can execute AI-driven actions with approval workflows.
- FR29: System can score leads based on conversation context.

### Automation & Workflow Builder
- FR30: Managers can create automation flows using triggers and actions.
- FR31: Users can enable/disable automations per tenant.
- FR32: System can execute automations (e.g., follow-up, CRM update, delay).
- FR33: Users can test automations with sample data.

### Handoff & Tasks
- FR34: Agents can hand off qualified leads with full context.
- FR35: Users can create follow-up tasks from conversations.

### Analytics & Reporting
- FR36: Users can view response time and SLA compliance metrics.
- FR37: Users can view AI usage and automation performance metrics.
- FR38: Managers can view funnel conversion analytics.

### Governance & Audit
- FR39: System logs AI actions and admin changes.
- FR40: Admin can review audit logs by user/action.
- FR41: Admin can pause or stop automations ("kill switch").

### Integrations & Extensibility
- FR42: System can receive inbound webhooks (e.g., lead created).
- FR43: System can send outbound HTTP requests as automation actions.

### Onboarding & Setup
- FR44: System provides guided onboarding for WhatsApp connection and first automation.
- FR45: Users can start from templates during initial setup.

## Non-Functional Requirements

### Performance
- p95 UI update latency for new inbound messages under defined SLA per tenant
- Real-time inbox updates without noticeable lag under normal load
- Automation execution within a short, predictable window after trigger

### Reliability & Availability
- High availability for WhatsApp gateway and inbox
- Graceful degradation when WhatsApp is unstable (fallback to manual)
- Automatic reconnection and clear status reporting

### Security & Privacy
- Encryption in transit and at rest for all tenant data
- Strict tenant data isolation and access control
- Audit logging for AI actions and admin changes
- LGPD-aligned data retention and deletion mechanisms

### Scalability
- Support growth in tenants, agents, and message volume without service disruption
- Tenant-scoped queues and caching to prevent noisy-neighbor issues

### Observability
- Centralized logs, metrics, and alerts for message flow, automation, and AI actions
- Per-tenant health indicators and incident visibility

### Integrations
- Stable webhook ingestion with retry handling
- Outbound HTTP actions with error handling and timeouts
