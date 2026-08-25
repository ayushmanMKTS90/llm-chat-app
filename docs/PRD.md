# Product Requirements Document
## DIY Command Center (role-agnostic)

**Version:** 1.0  
**Status:** Draft  
**Author:** opencode  
**Date:** 2026-08-06

---

## 1. Executive Summary

A **role-agnostic command center** — a single, self-hosted workspace that puts a
local AI assistant (Jan.ai) at its core and connects every tool a given role
needs through a unified **MCP (Model Context Protocol)** layer.

The user picks a "role profile," and the command center auto-configures the
skills, MCP servers, personas, and workflows for that job. The first vertical
profile is **Project Manager**, but the system is designed so new roles
(Designer, Ops, Founder, Marketer) are drop-in profiles — not separate products.

---

## 2. Problem Statement

Professionals juggle 5–10 disconnected tools every day:

- Email (Gmail / Outlook)
- Task management (Trello, Monday, Asana, Jira)
- Design assets (Canva)
- Documents, calendars, analytics, CRM

None of these tools talk to each other, and none of them operate **in the
context of your actual work**. Learning a new stack per role means re-wiring
everything from scratch.

### Pain points
- Context-switching between tabs is the #1 productivity killer.
- AI assistants are either cloud-locked, cut off from your private tools, or
  require custom engineering to connect.
- Repeating "draft email", "create task", "design newsletter" as one-off manual
  steps instead of orchestrated workflows.

---

## 3. Opportunity / Concept

> "One core. Any role. All your tools."

The command center is delivered as:
1. **A role-agnostic shell** (installation, MCP hub, skill registry, dashboard).
2. **A ecosystem of role profiles** (the PM profile being the flagship example).
3. **A configuration-first architecture** where wiring up tools is done by
   answering setup questions — not writing code.

---

## 4. Target Users / Personas

| Persona | Primary role | High-value tools |
|---------|--------------|------------------|
| Project Manager | PM profile | Trello/Monday, email, docs, calendar |
| Content/Creative | Content profile | Canva, email, social, docs |
| Founder / Ops | Founder profile | CRM, email, project mgmt, analytics |
| Consultant | Consultant profile | Client portals, docs, schedule |

The PM persona is the design target for v1.

---

## 5. Core Value Proposition

1. **Role-agnostic by design** — switch profiles, not products.
2. **Private by default** — Jan runs locally; your data, models, and tools stay
   on your machine.**
3. **Wire your tools together** — MCP lets the AI read/write the real tools
   you already use.
4. **Workflow rather than prompts** — tasks are composed of discrete skills
   ("market the task") that repeat reliably.

---

## 6. High-Level Architecture

```
                 ┌────────────────────────────┐
                 │       COMMAND CENTER       │
                 │        (dashboard UI)      │
                 └─────────────┬──────────────┘
                               │
                 ┌─────────────▼──────────────┐
                 │          JAN (core)        │
                 │      local LLM + skills    │
                 └─────────────┬──────────────┘
                               │
                 ┌─────────────▼──────────────┐
                 │          MCP HUB           │
                 │  (tool registry/servers)   │
                 └─┬───────────┬──────────┬───┘
                   │           │          │
        ┌──────────▼─┐  ┌──────▼───┐  ┌───▼──────┐
        │  Projects  │  │  Email   │  │  Canva   │
        │Trello/Mon. │  │ Gmail/etc│  │  Design  │
        └────────────┘  └──────────┘  └──────────┘
```

**Key components:**
- **Jan** — the local LLM runtime and the agent brain. Supplies the model,
  conversation context, and tool-calling logic. The role's future evolution
  (the skills and MCP servers) are provided as discrete installed profiles.
- **MCP** — the protocol + servers that expose external tools to Jan as
  structured, callable resources.
- **Skills** — plain-language modules that wrap one or many MCP→tool calls into
  a repeatable workflow (e.g., "write an email", "design a newsletter",
  "create a sprint board").
- **Profile config** — the yaml/json that wires a set of skills + MCP servers +
  templates into a role.

---

## 7. Product Requirements

### 7.1 Onboarding / Configuration (v1)
- **FR-01** Enter workspace in 5 minutes. Guided setup wizard asks for role.
- **FR-02** Connection-style authentication to each tool (OAuth/token/paste key).
- **FR-03** Live health check per integration ("Trello connected ✓").
- **FR-04** Auto-creating the right profile: skill registry + MCP servers filtered by role.

### 7.2 Command center dashboard (v1)
- **FR-05** Unified inbox of "action items" from all tools (tasks, unread email,
  flagged content).
- **FR-06** Single AI chat that can see/act across all connected tools via MCP.
- **FR-07** Role state: switch profiles without reinstalling anything.
- **FR-08** Run-then-approve: AI executes, user reviews, approves (human loop).

### 7.3 Role Profile: Project Manager (v1 flagship)
| ID | Requirement |
|----|-------------|
| FR-09 | **Task management** — view/read bytes and create tasks and boards on Trello and/or Monday via MCP. |
| FR-10 | **Email drafting/skills** — craft & store an email with a disciplined and timely persona; save to Drafts or send. |
| FR-11 | **Newsletter** — pick/load Canva templates via MCP, edit, then send out. |
| FR-12 | **Project "tech" console** — snapshot of open work, blockers, and due dates in one view. |
| FR-13 | **Meeting → action items** — turn meeting notes into tracked tasks with assigns + due dates. |

### 7.4 CRM-Relevant (advanced, v2)
- FR-14 scheduled/batch tasks.
- FR-15 per-tool access-control + secret vault for keys.
- FR-16 multi-user / team share same center (optional hosted mode).
- FR-17 logging + audit trail of all agent actions.

### 7.5 Non-functional
- **NFR-01** Privacy: local processing of queries via Jan; keys stored locally.
- **NFR-02** Extension for future MCP servers without code changes.
- **NFR-03** Failure isolation — one crashed server shouldn't take down the center.
- **NFR-04** Clear trace of which tool an action ran in.
- **NFR-05** Works offline for local model; cloud only for specific integrations.

---

## 8. Detailed User Stories (PM)
1. *As a PM, ** I can say "pull last week's tasks from the Monday board and list
   them by status" and it returns a sorted list via MCP.
2. *As a PM, ** I can say "create a new card 'Design review' on the 'Nov 14'
   list" and the center makes it in Trello.
3. *As a PM, **I can ask "draft a kickoff email to the design team with the
   project timeline" and review/send it in one flow.
4. *As a PM, **I can say "design a newsletter using my 'Q3 Update' template in
   Canva, swap the date and hero, then email it" and it's done end-to-end.
5. *As a PM, **I can say "sync - show me what's due today across email + tasks"
   for a unified view.

---

## 9. Competitive Landscape
- **Notion AI / other productivity AI** — cloud-centric, output oriented, not a tool-carrier with MCP.
- **Cursor-type IDE + MCP** — developer-centric, not a role-based workspace.
- **Zapier/Make** — automation triggers, but no conversational AI context layer.
- **Solo-API assistants (tool use)** — each isolated; no unified desk + graph.
- **Strong alternative** — dedicated local agent (Jan) + MCP + role profile.

---

## 10. Success Metrics (v1)
- Time-to-first-value: personalizing the draft < 5 min.
- % of users who wire ≥ 2 tools.
- # profiles per month / role-switch completion rate.
- End-to-end task success in the PM pipeline (email→board→newsletter) with no manual hand-off.

---

## 11. Open Questions / Risks
- **Tool-auth on local desktop** — tradeoff between OAuth (better UX) and
  API-key paste (simpler, less secure risk).
- **MCP maturity** — not every vendor ships an official MCP server; some need
  community build-outs, some need reverse RAG.
- **Canva MCP** — depends on API coverage: template browse/edit/send.
- Price/placement of the local model — GPU vs CPU for a responsive command
  console.

---

## 12. Roadmap
### v0 — Foundation
- Jan core + shell, profile registry, MCP hub, 1–2 toy integrations.

### v1 — PM Profile (MVP)
- Trello/Monday MCP, email skill, Canva template→newsletter→send, unified inbox.

### v2 — Multi-role + resilience
- CRM, calendar, analytics; cross-tool audit; exceptions + retry.

### v3 — Shared / cloud optional + team center, marketplace of profiles and
skills.

---

## 13. Success Criteria
Shipping a PM that can (a) fully machine-generate a coordinated sprint + the
kickoff email in one sitting, (b) turn 20 minutes of daily context-switching into
2. And same structure re-installable for a second persona in < 1/2 hour.