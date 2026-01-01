---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - "/Users/macos/Desktop/Projetos/crm-ai/_bmad-output/planning-artifacts/prd.md"
  - "/Users/macos/Desktop/Projetos/crm-ai/_bmad-output/planning-artifacts/architecture.md"
  - "/Users/macos/Desktop/Projetos/crm-ai/_bmad-output/planning-artifacts/ux-design-specification.md"
---

# falamais-ai - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for falamais-ai, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

- FR1: Admin can create and configure a tenant workspace.
- FR2: Admin can manage tenant settings (branding, business info).
- FR3: System enforces tenant data isolation across all entities.
- FR4: Admin can deactivate a tenant and revoke access.
- FR5: Admin can invite and manage users within a tenant.
- FR6: Admin can assign roles (Admin, Manager, Agent, Viewer).
- FR7: Managers can manage team assignments within their scope.
- FR8: Users can view and update their own profile.
- FR9: Admin can connect a WhatsApp account to a tenant.
- FR10: System can show WhatsApp connection status and health.
- FR11: Admin can reconnect or disconnect a WhatsApp account.
- FR12: System can alert users when WhatsApp connection fails.
- FR13: Agents can view real-time conversation lists and statuses.
- FR14: Agents can open a conversation and view full history.
- FR15: Agents can assign or transfer conversations.
- FR16: Agents can filter conversations by status, tags, or assignee.
- FR17: System can maintain a conversation timeline of actions and events.
- FR18: Agents can send and receive text messages.
- FR19: Agents can send and receive media (images, audio, documents).
- FR20: System can track delivery/read status per message.
- FR21: Users can create, view, and edit lead profiles.
- FR22: Users can move leads across funnel stages.
- FR23: Users can tag leads and manage custom fields.
- FR24: System can associate conversations with leads.
- FR25: System can classify intent and sentiment for incoming messages.
- FR26: System can generate AI response suggestions for agents.
- FR27: Agents can approve, edit, or reject AI suggestions.
- FR28: System can execute AI-driven actions with approval workflows.
- FR29: System can score leads based on conversation context.
- FR30: Managers can create automation flows using triggers and actions.
- FR31: Users can enable/disable automations per tenant.
- FR32: System can execute automations (e.g., follow-up, CRM update, delay).
- FR33: Users can test automations with sample data.
- FR34: Agents can hand off qualified leads with full context.
- FR35: Users can create follow-up tasks from conversations.
- FR36: Users can view response time and SLA compliance metrics.
- FR37: Users can view AI usage and automation performance metrics.
- FR38: Managers can view funnel conversion analytics.
- FR39: System logs AI actions and admin changes.
- FR40: Admin can review audit logs by user/action.
- FR41: Admin can pause or stop automations ("kill switch").
- FR42: System can receive inbound webhooks (e.g., lead created).
- FR43: System can send outbound HTTP requests as automation actions.
- FR44: System provides guided onboarding for WhatsApp connection and first automation.
- FR45: Users can start from templates during initial setup.

### NonFunctional Requirements

- Performance: p95 UI update latency under tenant SLA, real-time inbox updates, predictable automation execution.
- Reliability & Availability: high availability for WhatsApp gateway and inbox, graceful degradation, automatic reconnection.
- Security & Privacy: encryption in transit and at rest, strict tenant data isolation, audit logging, LGPD retention/deletion.
- Scalability: support growth in tenants, agents, and message volume; tenant-scoped queues and caching.
- Observability: centralized logs, metrics, and alerts for message flow, automation, and AI actions.
- Integrations: stable webhook ingestion with retries; outbound HTTP actions with timeouts and error handling.

### Additional Requirements

- UX: three-panel inbox layout, AI inline suggestions + copilot panel, WhatsApp-like experience, desktop-first density.
- UX: onboarding with QR connect, templates, and guided setup; AI suggestions with approval and undo.
- UX: keyboard shortcuts and quick switcher for desktop efficiency (DR1, DR2).
- Architecture: monorepo (create-turbo) with separate web, api, worker apps and shared packages.
- Architecture: schema-per-tenant in PostgreSQL, Prisma mappings and migration strategy.
- API: REST + OpenAPI, RFC 7807 Problem+JSON errors, Socket.io realtime events.
- Security: RBAC via API middleware, HMAC on webhooks, Redis rate limiting.
- Observability: Prometheus/Grafana + Sentry + structured logs (Pino).

### FR Coverage Map

FR1: Epic 1 - Workspace & Team Management  
FR2: Epic 1 - Workspace & Team Management  
FR3: Epic 1 - Workspace & Team Management  
FR4: Epic 1 - Workspace & Team Management  
FR5: Epic 1 - Workspace & Team Management  
FR6: Epic 1 - Workspace & Team Management  
FR7: Epic 1 - Workspace & Team Management  
FR8: Epic 1 - Workspace & Team Management  
FR9: Epic 2 - Onboarding & WhatsApp Connection  
FR10: Epic 2 - Onboarding & WhatsApp Connection  
FR11: Epic 2 - Onboarding & WhatsApp Connection  
FR12: Epic 2 - Onboarding & WhatsApp Connection  
FR13: Epic 3 - Real-Time Inbox & Messaging  
FR14: Epic 3 - Real-Time Inbox & Messaging  
FR15: Epic 3 - Real-Time Inbox & Messaging  
FR16: Epic 3 - Real-Time Inbox & Messaging  
FR17: Epic 3 - Real-Time Inbox & Messaging  
FR18: Epic 3 - Real-Time Inbox & Messaging  
FR19: Epic 3 - Real-Time Inbox & Messaging  
FR20: Epic 3 - Real-Time Inbox & Messaging  
FR21: Epic 4 - Leads & CRM Pipeline  
FR22: Epic 4 - Leads & CRM Pipeline  
FR23: Epic 4 - Leads & CRM Pipeline  
FR24: Epic 4 - Leads & CRM Pipeline  
FR25: Epic 5 - AI Copilot & Lead Intelligence  
FR26: Epic 5 - AI Copilot & Lead Intelligence  
FR27: Epic 5 - AI Copilot & Lead Intelligence  
FR28: Epic 5 - AI Copilot & Lead Intelligence  
FR29: Epic 5 - AI Copilot & Lead Intelligence  
FR30: Epic 6 - Automation Builder & Execution  
FR31: Epic 6 - Automation Builder & Execution  
FR32: Epic 6 - Automation Builder & Execution  
FR33: Epic 6 - Automation Builder & Execution  
FR34: Epic 7 - Handoff & Task Management  
FR35: Epic 7 - Handoff & Task Management  
FR36: Epic 8 - Analytics & Reporting  
FR37: Epic 8 - Analytics & Reporting  
FR38: Epic 8 - Analytics & Reporting  
FR39: Epic 9 - Governance & Audit Controls  
FR40: Epic 9 - Governance & Audit Controls  
FR41: Epic 9 - Governance & Audit Controls  
FR42: Epic 10 - Integrations & Extensibility  
FR43: Epic 10 - Integrations & Extensibility  
FR44: Epic 2 - Onboarding & WhatsApp Connection  
FR45: Epic 2 - Onboarding & WhatsApp Connection  

## Epic List

### Epic 1: Workspace & Team Management
Enable admins to create a tenant, manage branding, invite users, assign roles, and control access.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR8

### Epic 2: Onboarding & WhatsApp Connection
Guide users through onboarding, connect WhatsApp, and keep connection health visible.
**FRs covered:** FR9, FR10, FR11, FR12, FR44, FR45

### Epic 3: Real-Time Inbox & Messaging
Allow agents to handle conversations in real time with full message history and media support.
**FRs covered:** FR13, FR14, FR15, FR16, FR17, FR18, FR19, FR20

### Epic 4: Leads & CRM Pipeline
Provide lead profiles, tagging, custom fields, and funnel stage management.
**FRs covered:** FR21, FR22, FR23, FR24

### Epic 5: AI Copilot & Lead Intelligence
Deliver AI suggestions, approvals, and lead scoring to guide decisions.
**FRs covered:** FR25, FR26, FR27, FR28, FR29

### Epic 6: Automation Builder & Execution
Allow managers to build, test, enable, and execute automations.
**FRs covered:** FR30, FR31, FR32, FR33

### Epic 7: Handoff & Task Management
Support qualified handoff workflows and manual follow-up tasks.
**FRs covered:** FR34, FR35

### Epic 8: Analytics & Reporting
Expose response SLAs, AI performance, and funnel conversion metrics.
**FRs covered:** FR36, FR37, FR38

### Epic 9: Governance & Audit Controls
Provide audit logs, admin reviews, and automation kill switches.
**FRs covered:** FR39, FR40, FR41

### Epic 10: Integrations & Extensibility
Support inbound webhooks and outbound HTTP actions.
**FRs covered:** FR42, FR43


## Epic 1: Workspace & Team Management

Enable admins to create a tenant, manage branding, invite users, assign roles, and control access.

### Story 1.1: Set Up Starter Template and Bootstrap Tenant Workspace

As a Platform Engineer,
I want to initialize the monorepo from the approved starter template and bootstrap a tenant workspace,
So that admins can start using an isolated environment on day one.


**Acceptance Criteria:**

**Given** the project is not yet initialized
**When** I run the approved starter template command
**Then** the monorepo structure is created with apps/web, apps/api, apps/worker, and shared packages
**And** base environment configuration files are created.

**Given** required tenant details are provided
**When** the bootstrap runs
**Then** a tenant record is stored in the public schema and a tenant schema is provisioned
**And** the initial admin user is associated with that tenant.

**FRs:** FR1, FR3

### Story 1.2: Manage Tenant Settings


As an Admin,
I want to update tenant branding and business info,
So that my workspace reflects my company identity.

**Acceptance Criteria:**

**Given** I am an Admin in a tenant
**When** I update branding or business settings
**Then** changes are persisted for that tenant
**And** users in the tenant see the updated branding.

**FRs:** FR2

### Story 1.3: User Directory and Deactivation


As an Admin,
I want to view and manage tenant users,
So that I can control who has access.

**Acceptance Criteria:**

**Given** I am an Admin
**When** I open the user directory
**Then** I can see all users in my tenant with role and status
**And** I can deactivate a user, removing their access.

**FRs:** FR5

### Story 1.4: Invite User to Tenant


As an Admin,
I want to invite a new user by email,
So that they can join my workspace.

**Acceptance Criteria:**

**Given** I provide an email and role
**When** I send an invite
**Then** an invitation record is created with an expiry
**And** the invited user can accept the invite and join the tenant.

**FRs:** FR5

### Story 1.5: Assign Roles and Enforce RBAC


As an Admin,
I want to assign roles to users,
So that permissions align with their responsibilities.

**Acceptance Criteria:**

**Given** a user exists in my tenant
**When** I change their role
**Then** their permissions reflect the new role immediately
**And** unauthorized access is blocked by API middleware.

**FRs:** FR6

### Story 1.6: Team and Queue Assignments


As a Manager,
I want to assign users to teams or queues,
So that conversations can be routed correctly.

**Acceptance Criteria:**

**Given** I am a Manager
**When** I assign users to a team or queue
**Then** the assignment is saved and visible to Admins and Managers
**And** routing rules can use these assignments.

**FRs:** FR7

### Story 1.7: User Profile Self-Update


As a User,
I want to update my profile,
So that my name and details stay current.

**Acceptance Criteria:**

**Given** I am authenticated
**When** I update my profile fields
**Then** changes are saved to my user record
**And** I can see the updated profile data immediately.

**FRs:** FR8

### Story 1.8: Deactivate Tenant Workspace

As an Admin,
I want to deactivate a tenant workspace,
So that access is revoked when a workspace is no longer active.


**Acceptance Criteria:**

**Given** I am an Admin and a tenant is active
**When** I deactivate the tenant workspace with confirmation
**Then** the tenant status is set to inactive and all sessions are revoked
**And** new access and webhook ingestion for the tenant are blocked.

**FRs:** FR4

## Epic 2: Onboarding & WhatsApp Connection

Guide users through onboarding, connect WhatsApp, and keep connection health visible.

### Story 2.1: Onboarding Checklist and Progress


As an Admin,
I want a guided onboarding checklist,
So that I know the next step to activate the workspace.

**Acceptance Criteria:**

**Given** a new tenant workspace
**When** I open onboarding
**Then** I see a checklist of setup steps with progress
**And** my progress is saved between sessions.

**FRs:** FR44

### Story 2.2: Connect WhatsApp via QR Code


As an Admin,
I want to connect WhatsApp using a QR code,
So that my tenant can start receiving messages.

**Acceptance Criteria:**

**Given** I initiate a WhatsApp connection
**When** a QR code is generated
**Then** I can scan it to establish a session
**And** the tenant connection status changes to connected.

**Given** the QR code expires or the connection fails
**When** the session is not established within the timeout
**Then** the system shows a failure state with a regenerate action
**And** the tenant remains disconnected.

**FRs:** FR9

### Story 2.3: Connection Health, Reconnect, and Alerts


As an Admin,
I want to see connection health and reconnect if needed,
So that I do not miss incoming messages.

**Acceptance Criteria:**

**Given** a WhatsApp connection is active
**When** the connection drops or reconnects
**Then** the status updates in the UI and an alert is shown if disconnected
**And** I can trigger reconnect or disconnect actions from settings.

**Given** a reconnect attempt fails
**When** I trigger reconnect
**Then** I see an error message with next steps
**And** the system stays disconnected until a successful reconnect.

**FRs:** FR10, FR11, FR12

### Story 2.4: Onboarding Templates


As an Admin,
I want to start from onboarding templates,
So that I can begin setup from a prebuilt starting point.

**Acceptance Criteria:**

**Given** onboarding is in progress
**When** I select a template
**Then** a template preview is shown and the selection is saved to the tenant
**And** the onboarding checklist marks the template step complete.

**Given** the template library fails to load
**When** I open template selection
**Then** I see a retry option and can proceed without a template
**And** the failure is logged for support.

**FRs:** FR45

## Epic 3: Real-Time Inbox & Messaging

Allow agents to handle conversations in real time with full message history and media support.

### Story 3.1: Real-Time Conversation List


As an Agent,
I want to see a real-time list of conversations,
So that I can respond quickly to new messages.

**Acceptance Criteria:**

**Given** new messages arrive for my tenant
**When** the inbox is open
**Then** the conversation list updates in real time with unread counts
**And** each conversation shows last message and status.

**FRs:** FR13

### Story 3.2: Conversation Thread View


As an Agent,
I want to open a conversation and view the full history,
So that I understand the context before replying.

**Acceptance Criteria:**

**Given** I select a conversation
**When** the thread loads
**Then** I can see the complete message history with timestamps
**And** conversation metadata is visible.

**FRs:** FR14

### Story 3.3: Assign and Transfer Conversations


As an Agent,
I want to assign or transfer conversations,
So that the right teammate handles the lead.

**Acceptance Criteria:**

**Given** I have access to a conversation
**When** I assign or transfer it to another user
**Then** the assignee is updated and visible in the inbox
**And** the change is recorded in the conversation timeline.

**FRs:** FR15

### Story 3.4: Inbox Filters and Search


As an Agent,
I want to filter conversations by status, tags, or assignee,
So that I can focus on the most important chats.

**Acceptance Criteria:**

**Given** the inbox list is loaded
**When** I apply filters or search
**Then** the list updates to match the filters
**And** filters can be cleared to restore the full list.

**FRs:** FR16

### Story 3.5: Conversation Timeline of Actions


As an Agent,
I want to see a timeline of actions in a conversation,
So that I can track changes and AI actions.

**Acceptance Criteria:**

**Given** conversation events occur (status, assignment, AI actions)
**When** I view the conversation timeline
**Then** each event is recorded with timestamp and actor
**And** events are ordered chronologically.

**FRs:** FR17

### Story 3.6: Send and Receive Text Messages


As an Agent,
I want to send and receive text messages in real time,
So that I can chat with leads without delays.

**Acceptance Criteria:**

**Given** a conversation is open
**When** I send a text message
**Then** the message is stored and delivered via WhatsApp gateway
**And** inbound text messages are persisted and shown in the thread.

**Given** the WhatsApp gateway is unavailable
**When** I send a text message
**Then** the message is marked failed with a retry option
**And** no duplicate message is sent.

**FRs:** FR18

### Story 3.7: Media Messages Support


As an Agent,
I want to send and receive media (images, audio, documents),
So that I can handle rich conversations.

**Acceptance Criteria:**

**Given** a conversation is open
**When** I send or receive media
**Then** the file is stored in object storage and linked to the message
**And** media previews are visible in the conversation thread.

**Given** a media file exceeds size or type limits
**When** I attempt to send it
**Then** the system blocks the upload and shows a validation error
**And** no message is created.

**FRs:** FR19

### Story 3.8: Delivery and Read Status


As an Agent,
I want to see delivery and read status for messages,
So that I know when the lead has seen my reply.

**Acceptance Criteria:**

**Given** WhatsApp delivery and read events are received
**When** message statuses update
**Then** the UI reflects delivered and read states
**And** status changes are stored in message history.

**FRs:** FR20

### Story 3.9: Keyboard Shortcuts and Quick Switcher


As an Agent,
I want keyboard shortcuts and a quick switcher,
So that I can navigate and act faster without losing context.

**Acceptance Criteria:**

**Given** the inbox is open
**When** I use defined shortcuts (next/previous conversation, focus search, send reply)
**Then** the UI performs the action immediately
**And** shortcuts are visible in a help overlay.

**Given** I press Ctrl/Cmd+K
**When** the quick switcher opens
**Then** I can search conversations, leads, or settings
**And** selecting a result keeps draft text intact in the composer.

**FRs:** DR1, DR2

## Epic 4: Leads & CRM Pipeline

Provide lead profiles, tagging, custom fields, and funnel stage management.

### Story 4.1: Lead Profile Creation and Editing


As a User,
I want to create and edit lead profiles,
So that I can manage customer data in one place.

**Acceptance Criteria:**

**Given** I have a lead from a conversation or manual entry
**When** I create or edit a lead profile
**Then** lead data is saved and tenant-scoped
**And** I can view the updated lead details.

**FRs:** FR21

### Story 4.2: Funnel Stage Management


As a User,
I want to move leads across funnel stages,
So that I can track progress in the pipeline.

**Acceptance Criteria:**

**Given** a lead exists in the pipeline
**When** I move it to another stage
**Then** the stage change is saved and reflected in the UI
**And** the change appears in the lead timeline.

**FRs:** FR22

### Story 4.3: Tags and Custom Fields


As a User,
I want to add tags and custom fields to leads,
So that I can segment and personalize follow-ups.

**Acceptance Criteria:**

**Given** a lead profile is open
**When** I add tags or custom fields
**Then** they are stored with the lead
**And** tags can be used for filtering.

**FRs:** FR23

### Story 4.4: Conversation to Lead Association


As a User,
I want conversations linked to leads,
So that I can view all communication history in one profile.

**Acceptance Criteria:**

**Given** a conversation and a lead exist
**When** the conversation is linked to the lead
**Then** the lead profile shows related conversations
**And** the conversation references the lead.

**FRs:** FR24

## Epic 5: AI Copilot & Lead Intelligence

Deliver AI suggestions, approvals, and lead scoring to guide decisions.

### Story 5.1: Intent and Sentiment Classification


As an Agent,
I want incoming messages classified by intent and sentiment,
So that I can prioritize responses.

**Acceptance Criteria:**

**Given** a new inbound message
**When** AI analysis runs
**Then** intent and sentiment are stored on the conversation
**And** the classification is visible in the UI.

**FRs:** FR25

### Story 5.2: AI Response Suggestions


As an Agent,
I want AI to suggest response drafts,
So that I can reply faster with confidence.

**Acceptance Criteria:**

**Given** a conversation is open
**When** AI generates a draft
**Then** the suggestion appears inline with a confidence score
**And** the draft can be inserted into the composer.

**Given** the AI provider is unavailable or times out
**When** a draft is requested
**Then** the UI shows an AI unavailable state
**And** I can continue with a manual reply.

**FRs:** FR26

### Story 5.3: Approve, Edit, or Reject Suggestions


As an Agent,
I want to approve, edit, or reject AI suggestions,
So that I stay in control of the response.

**Acceptance Criteria:**

**Given** an AI suggestion is shown
**When** I approve, edit, or reject it
**Then** the selected action is executed and logged
**And** the conversation thread reflects the final message.

**FRs:** FR27

### Story 5.4: AI Action Execution with Approval


As an Agent,
I want to approve AI actions like stage updates or follow-ups,
So that AI can operate safely inside the CRM.

**Acceptance Criteria:**

**Given** AI recommends a system action
**When** I approve it
**Then** the action executes in the CRM and is recorded in the conversation timeline
**And** an undo window is available when applicable.

**Given** an approved action fails
**When** execution returns an error
**Then** the system shows the failure reason without partial updates
**And** I can retry or cancel the action.

**FRs:** FR28

### Story 5.5: Lead Scoring


As a Manager,
I want leads scored based on conversation context,
So that I can prioritize the hottest opportunities.

**Acceptance Criteria:**

**Given** lead interactions occur
**When** scoring runs
**Then** the lead score is updated and visible in the CRM
**And** score history is retained for analytics.

**FRs:** FR29

## Epic 6: Automation Builder & Execution

Allow managers to build, test, enable, and execute automations.

### Story 6.1: Create Automation Draft


As a Manager,
I want to create a new automation draft in the builder,
So that I can start designing a flow without running it.

**Acceptance Criteria:**

**Given** I open the automation builder
**When** I create a new flow with a name and description
**Then** a draft automation is saved for my tenant
**And** I can return later to continue editing.

**FRs:** FR30

### Story 6.2: Configure Triggers, Actions, and Delays


As a Manager,
I want to add triggers, actions, and delays to a draft flow,
So that the automation logic is defined.

**Acceptance Criteria:**

**Given** a draft automation exists
**When** I add nodes and configure required fields
**Then** the configuration is saved and visible in the flow
**And** missing required fields show validation errors.

**FRs:** FR30

### Story 6.3: Enable or Disable Automations


As a Manager,
I want to enable or disable automations per tenant,
So that I can control when they run.

**Acceptance Criteria:**

**Given** an automation exists
**When** I toggle it on or off
**Then** its status is updated immediately
**And** execution respects the current status.

**Given** an automation has validation errors
**When** I attempt to enable it
**Then** the system blocks activation and shows the error list
**And** the automation remains disabled.

**FRs:** FR31

### Story 6.4: Execute Automations


As a Manager,
I want automations to execute when triggers fire,
So that leads receive the right follow-ups on time.

**Acceptance Criteria:**

**Given** an automation is enabled
**When** a trigger condition is met
**Then** the configured actions run in the correct order
**And** failures are retried with backoff and logged.

**FRs:** FR32

### Story 6.5: Test Automations with Sample Data


As a Manager,
I want to test an automation with sample data,
So that I can validate it before activation.

**Acceptance Criteria:**

**Given** an automation is in draft or enabled state
**When** I run a test with sample input
**Then** the system executes a dry-run and shows the outcome
**And** no real messages are sent.

**Given** the sample data is invalid
**When** I run a test
**Then** I see validation errors
**And** no execution is performed.

**FRs:** FR33

## Epic 7: Handoff & Task Management

Support qualified handoff workflows and manual follow-up tasks.

### Story 7.1: Handoff Qualified Leads


As an Agent,
I want to hand off qualified leads with context,
So that Inside Sales can continue without losing information.

**Acceptance Criteria:**

**Given** a lead is qualified
**When** I hand off the lead
**Then** a handoff package is created with conversation summary and notes
**And** the assignee is notified.

**FRs:** FR34

### Story 7.2: Create Follow-Up Tasks


As an Agent,
I want to create follow-up tasks from conversations,
So that I can ensure the next action happens.

**Acceptance Criteria:**

**Given** a conversation is open
**When** I create a task with due date and assignee
**Then** the task is saved and visible in the tasks view
**And** task status can be updated.

**FRs:** FR35

## Epic 8: Analytics & Reporting

Expose response SLAs, AI performance, and funnel conversion metrics.

### Story 8.1: Response Time and SLA Metrics


As a Manager,
I want to view response time and SLA compliance metrics,
So that I can measure team performance.

**Acceptance Criteria:**

**Given** conversation activity exists
**When** I view the analytics dashboard
**Then** response time metrics are computed per tenant and period
**And** SLA compliance is displayed with trends.

**FRs:** FR36

### Story 8.2: AI and Automation Performance Metrics


As a Manager,
I want to view AI usage and automation performance,
So that I can measure automation impact.

**Acceptance Criteria:**

**Given** AI actions and automations have run
**When** I view analytics
**Then** acceptance rate and automation success rate are shown
**And** metrics are filterable by date range.

**FRs:** FR37

### Story 8.3: Funnel Conversion Analytics


As a Manager,
I want to view funnel conversion metrics,
So that I can identify drop-off points.

**Acceptance Criteria:**

**Given** leads have stages over time
**When** I view the funnel report
**Then** conversion by stage is displayed
**And** I can filter by time period and team.

**FRs:** FR38

## Epic 9: Governance & Audit Controls

Provide audit logs, admin reviews, and automation kill switches.

### Story 9.1: Audit Log Capture


As an Admin,
I want all AI and admin actions logged,
So that I can audit system behavior.

**Acceptance Criteria:**

**Given** an AI or admin action occurs
**When** it is executed
**Then** an audit log entry is stored with tenant, user, action, and timestamp
**And** logs are immutable.

**FRs:** FR39

### Story 9.2: Audit Log Review


As an Admin,
I want to filter and review audit logs,
So that I can investigate issues quickly.

**Acceptance Criteria:**

**Given** audit logs exist
**When** I filter by user, action, or date
**Then** results update immediately
**And** I can export or copy log details.

**FRs:** FR40

### Story 9.3: Automation Kill Switch


As an Admin,
I want to pause or stop automations,
So that I can prevent unwanted actions.

**Acceptance Criteria:**

**Given** automations are running
**When** I trigger a kill switch for a tenant
**Then** all automations are paused immediately
**And** new automation executions are blocked until re-enabled.

**FRs:** FR41

## Epic 10: Integrations & Extensibility

Support inbound webhooks and outbound HTTP actions.

### Story 10.1: Inbound Webhook Ingestion


As a Manager,
I want to receive inbound webhooks,
So that external systems can create or update leads.

**Acceptance Criteria:**

**Given** an external system sends a webhook
**When** the webhook is received
**Then** the payload is validated and processed into a lead or event
**And** errors return RFC 7807 responses.

**FRs:** FR42

### Story 10.2: Outbound HTTP Actions


As a Manager,
I want automation flows to call external HTTP endpoints,
So that I can integrate with other tools.

**Acceptance Criteria:**

**Given** an automation includes an HTTP action
**When** the action executes
**Then** the HTTP request is sent with retries and timeout handling
**And** the response is logged for review.

**FRs:** FR43
