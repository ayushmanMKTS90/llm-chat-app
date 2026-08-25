# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS with small vanilla JS. Single self-contained page; this repo already serves static HTML through Vercel (`vercel.json`, existing `.html` files). No build step.

## Users

Role-agnostic professionals who fight tool sprawl — project managers, founders, and solo operators. Primary scene: someone juggling several disconnected SaaS tools (task boards, email, design tools) daily, who wants an AI that operates across all of them in one place instead of bouncing between tabs.

## Product Purpose

A local-first "DIY Command Center": a single workspace with a private AI core (Jan) at its
center, wired through MCP to the tools a given role uses every day. Success is a user who
stops context-switching and runs a whole workflow (manage tasks, draft + send email, design
and send a newsletter) from one desk without their data leaving their machine.

## Positioning

Role-agnostic by design: one core, any role, all your tools. Competing products are either
cloud-locked and chat-only, or developer-tooling (an IDE), or trigger-based automation
(Zapier) without a conversational context layer. This is the first "pick a role, wire your
own tools, keep it local" command console.

## Operating Context

Local desktop app (Jan at its core). The user connects tools via MCP servers: task managers
(Trello, Monday), email (Gmail), and design (Canva). Skills turn tool calls into repeatable
workflows — email drafting, newsletter-from-template → send, project sync. Tool connections
require their own API keys/auth, which stay local.

## Capabilities and Constraints

- PM profile: read/create tasks on Trello and Monday via MCP; draft and send email; pull
  Canva templates, edit, and send as a newsletter; unified inbox of due items.
- Local-first and private by default; role profiles are swappable.
- **Undecided:** pricing, hosted/team mode, and which non-PM profiles ship first. These
  must not be fabricated on the landing page.

## Brand Commitments

Working name: **"Command Center"** (keep it generic per the user's choice). "Role-agnostic"
and "local-first / private" are the identity commitments to carry.

## Evidence on Hand

- Project docs: `docs/PRD.md`, `docs/SETUP_GUIDE.md` describe the concept, architecture, and
  setup flow in detail.
- No customer testimonials, benchmarks, prices, or live endpoints exist. Do not invent them.

## Product Principles

- One core, any role: the center is generic; roles are swappable profiles.
- Prove it works, don't claim it: show the unified desk and a full workflow, not feature lists.
- Private is the position: local core, local keys, no cloud lock-in.
- Wire, don't switch: MCP connects the tools you already use.
- Role-agnostic honesty: visualize the PM profile, label synthetic mock data.

## Accessibility & Inclusion

Web content must be readable/operable at standard (AA) contrast, keyboard-navigable, and
responsive. No product-specific requirement established beyond that.