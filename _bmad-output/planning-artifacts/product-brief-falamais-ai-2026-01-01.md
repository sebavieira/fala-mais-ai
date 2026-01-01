---
stepsCompleted: [1, 2, 3, 4, 5, 6]
inputDocuments:
  - "/Users/macos/Desktop/Projetos/crm-ai/prd.md"
date: "2026-01-01"
author: "Macos"
---

# Product Brief: falamais-ai

<!-- Content will be appended sequentially through collaborative workflow steps -->
## Executive Summary

falamais-ai is a multi-tenant SaaS that connects WhatsApp to an agentic AI copilot, enabling non-technical teams to run marketing, sales, and customer success through guided decisions and autonomous actions. The platform addresses slow response times, missed opportunities, and lack of operational know-how by analyzing conversations, suggesting next steps, and executing actions inside the CRM workflow.

---

## Core Vision

### Problem Statement

Small and mid-sized businesses (and increasingly larger teams) want AI-powered WhatsApp operations but lack the technical knowledge to configure agents, automate workflows, or even know what to ask. Existing tools feel complex or limited, leaving teams stuck with manual responses and mechanical bots.

### Problem Impact

- Slow or inconsistent replies cause lost leads and revenue
- Teams fail to convert or retain customers due to lack of guidance
- Operators rely on ad-hoc decisions with little strategic support
- Customer experience feels generic and fragmented

### Why Existing Solutions Fall Short

Current platforms (e.g., Zenvia, Blip, Chatwoot) focus on messaging or CRM features but do not deliver truly agentic AI. They require manual configuration, rely on rigid bots, and lack a natural "do this for me" experience tied to CRM actions and business goals.

### Proposed Solution

falamais-ai unifies WhatsApp inbox, CRM, and automation with an agentic AI layer. Users connect their WhatsApp account and receive a copilot that understands intent, suggests actions, and can autonomously execute tasks in the system — such as follow-ups, lead scoring, funnel stage updates, and operational insights — without demanding technical expertise.

### Key Differentiators

- Agentic AI with system actions: AI can call internal tools to execute real CRM tasks
- Guided decision-making: insights and next steps during live conversations
- Low-tech adoption: natural language control instead of complex configuration
- Unified workflow: inbox + CRM + automation in a single experience
- Multi-tenant SaaS: designed for scale across businesses and teams

## Target Users

### Primary Users

**Persona 1: Ana, Front-Desk Coordinator (Clinics/Schools/Construction)**
- Role & context: Manages inbound WhatsApp inquiries, scheduling, and lead follow-ups while juggling other office tasks.
- Goals: Reply quickly, keep the calendar full, and convert inquiries into booked clients.
- Pain: Too many parallel tasks, missed or delayed replies, and inconsistent follow-up.
- Success: Handles all conversations without backlog and closes more sales/appointments.

**Persona 2: Lucas, SDR (B2C/B2B)**
- Role & context: Works at the top/middle of the funnel to pre-qualify and qualify leads (sometimes only pre-qualification) and pass hot leads to Inside Sales.
- Goals: Identify high-intent leads fast and move them to the next stage.
- Pain: Too much data, unclear next steps, and beginners getting lost during conversations.
- Success: Higher qualified-lead rate and more handoffs that convert into meetings/sales.

**Persona 3: Carla, Small Business Owner**
- Role & context: Owner/manager who handles WhatsApp personally with a small team, or relies primarily on the team for day-to-day replies.
- Goals: Keep sales flowing, avoid missed leads, and maintain a simple, reliable process.
- Pain: Lack of time, lost messages, and no consistent sales routine.
- Success: More sales with an organized pipeline and less rework.

### Secondary Users

- Managers/Admins: Need visibility into performance, automation ROI, and team activity; configure approvals and rules.
- Ops/IT (less common): Handle integrations, governance, and multi-tenant setup.

### User Journey

- Discovery: Referrals/networking, ads/search, and communities/partners.
- Onboarding: Connect WhatsApp, import leads, set goals, and let AI suggest first actions.
- Core Usage: AI suggests next steps, automates follow-ups, updates CRM stages, and surfaces insights.
- Success Moment: First AI-driven action advances or closes a deal; or a one-click suggestion saves the conversation; or an insight report shows measurable gains.
- Long-term: Becomes the operating system for WhatsApp sales and support.

## Success Metrics

### User Success Metrics
- Median first response time on WhatsApp
- % of conversations answered within a defined SLA
- % of conversations with AI suggestions accepted by agents
- % of leads qualified by AI and accepted by Inside Sales
- % of automated follow-ups executed successfully
- CSAT (1-5) after resolution
- Missed-conversation rate (messages without response)

### Business Objectives
- Increase in funnel conversion rate from WhatsApp conversations
- Revenue attributed to WhatsApp-driven flows
- Higher customer retention / repeat purchase rate
- Lower cost per conversion through automation

### Key Performance Indicators
- Active tenants (monthly)
- WhatsApp accounts connected per tenant
- Active automations per tenant
- AI action success rate (actions completed without manual correction)
- Time-to-first-value (from onboarding to first automation executed)

## MVP Scope

### Core Features
- WhatsApp connection with full media support (text, audio, images, documents) and webhooks
- Real-time inbox with conversation statuses, assignment, and history
- Contacts/Leads management with configurable funnel (kanban)
- Agentic AI copilot for suggestions + autonomous actions (with approvals and audit log)
- Essential automation builder (triggers + basic actions like send message, update CRM, delay)
- Multi-tenant SaaS foundation with roles and permissions
- Basic analytics for response time, conversion, and AI performance
- Secure authentication and data handling

### Out of Scope for MVP
- Multi-channel beyond WhatsApp (Instagram, email, etc.)
- Deep CRM integrations (Salesforce, HubSpot, SAP)
- Marketplace for templates/flows
- Mobile native apps
- Advanced AI modules (RAG knowledge base, predictive best-time-to-contact, complex forecasting)
- Enterprise SSO and custom compliance frameworks

### MVP Success Criteria
- Consistent WhatsApp reliability with real-time updates across tenants
- Clear improvement in response time and conversion compared to baseline
- AI action success rate high enough to be trusted by operators
- Teams adopt daily usage without heavy technical setup

### Future Vision
- Multi-channel inbox (WhatsApp + email + social)
- Template marketplace and industry-specific playbooks
- Advanced AI orchestration across sales/marketing/CS
- Predictive analytics and proactive automation at scale
- Mobile companion apps and partner ecosystem
