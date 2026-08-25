# Setup Guide
## DIY Command Center — Project Manager Profile

This guide walks you through standing up your own role-agnostic command center
with **Jan.ai** at its core, then wiring the **Project Manager** profile so you
can manage tasks, draft email, and design+send newsletters from one place.

> **Total time:** ~30–45 min. Assumes a Windows / macOS / Linux machine and
> basic comfort with the terminal and installing desktop apps.

---

## 0. What you'll end up with

```
┌────────────────────────────────────────────┐
│  Jan Desktop (the brain + agents)          │
│   ├── Local model (private, offline)       │
│   ├── Skills (email, newsletter, PMT tools)│
│   └── MCP client                            │
└──────────────────┬─────────────────────────┘
                   │
┌──────────────────▼─────────────────────────┐
│  MCP Servers (tools Jan can call)            │
│   ├── trello-mcp      → your Trello boards  │
│   ├── monday-mcp      → your Monday boards  │
│   ├── canva-mcp       → templates / design  │
│   └── email-mcp       → Gmail/Outlook send  │
└─────────────────────────────────────────────┘
```

Everything runs locally. Your keys and data stay on your machine.

---

## 1. Install Jan (the core)

1. Go to **https://jan.ai** and download the desktop app for your OS.
2. Install and launch **Jan**.
3. On first launch, pick a model. For good tool-calling reliability, choose a
  7B–14B local model from the catalog (e.g., a Llama 3 / Qwen variant). CPU-only
  machines should pick a 4-bit quantized 7B for reasonable speed.

> **Note:** Jan's conversation context and the AI runtime you will "plug in" all
> your MCP servers and skills. If Jan ships with its own MCP manager, use that;
> otherwise use a companion MCP client/bridge (see §3).

---

## 2. Understand the 3 layers (<15 min)

Before wiring, know what you're connecting:

- **Skills** — plain-language instructions that turn a model + tools into a
  named, repeatable capability (e.g. "write an email", "build a newsletter").
  These live in your profile config.
- **MCP servers** — each external tool (Trello, Monday, Canva, Gmail) exposes
  an MCP server that gives the AI structured, callable resources.
- **Profile** — a config file that loads a specific set of skills + MCP servers
  into Jan for a given role.

**You only need to wire MCP servers once** — then the PM profile pulls them in.

---

## 3. Connect the data as MCP servers

### 3.1 Get API credentials (do each once)

| Tool | Setup |
|------|-------|
| **Trello** | 1. Go to **trello.com/app-key** 2. Copy your **API key** 3. Click "Generate new API token". |
| **Monday.com** | 1. In a Monday account, open **Settings → For Developers → Overview** 2. Copy your **API token**. |
| **Canva** | 1. Create an app at **canva.dev/apps** 2. Set up **OAuth** (connect + refresh token) and note the client ID/secret. |
| **Email** | 1. **Gmail:** enable a Google Cloud project + OAuth (Or use an SMTP app password). **Outlook:** register an OAuth app / generate an App password. |

> **Security note:** treat every key like a password. Your config is local, but
> still don't commit it to git or share screenshots.

### 3.2 Point Jan at each MCP server

MCP servers are usually run as small local processes (a `uv`/node script or a
Docker container). One common pattern:

```jsonc
// jan.mcp.config.json (example — keys scrubbed)
{
  "mcpServers": {
    "trello": {
      "command": "uvx",
      "args": ["trello-mcp"],
      "env": {
        "TRELLO_API_KEY": "your_key",
        "TRELLO_API_TOKEN": "your_token"
      }
    },
    "monday": {
      "command": "uvx",
      "args": ["monday-mcp"],
      "env": { "MONDAY_API_TOKEN": "your_token" }
    },
    "email": {
      "command": "uvx",
      "args": ["gmail-mcp"],  // or a generic SMTP/send MCP
      "env": {
        "ACCOUNT_MAILER": "...",
        "ACCOUNT_MAILER_PASSWORD": "..."
      }
    },
    "canva": {
      "command": "uvx",
      "args": ["canva-mcp"],
      "env": { "CANVA_APP_SECRET": "...", "CANVA_REDIRECT_URI": "..." }
    }
  }
}
```

Import or paste this into Jan's (or your bridge's) **MCP manager**. Then click
"Test"/"Refresh" — you want 4 green "connected" indicators.

---

## 4. Create the role profile

Create a folder for your PM workspace and add a profile config:

```yaml
# role-pm.yaml
role: project_manager
core: jan
model: "local-7b-qt4f16"           # your Jan model id

mcp_servers: [trello, monday, canva, email]

skills:
  - email:write_and_send        # draft + send an email
  - newsletter:design_and_send  # Canva template → edit → send
  - project:sync_overview       # unified todo/due view
  - project:create_card         # one-liner "make card on board X"
```

**What "skills" do:** Each skill is a short markdown-based playbook you give
Jan. Example of the newsletter skill:

```markdown
# Skill: design-and-send-newsletter
1. Ask user for the newsletter topic + target date.
2. Call `canva` → list templates (filter: newsletter).
3. Read the chosen template's editable fields.
4. Edit the date + hero + body copy using the template body's content spec.
5. Preview, then call `email_send` with recipients (draft first, ask to confirm).
```

Save these as e.g. `.jan/skills/pm/*.md` and reference them in the config.

---

## 5. Start the Agent

1. **Open Jan** and select your **PM profile**.
2. Confirm all MCP servers show **connected**.
3. Type your first real command to verify the loop:

   ```
   Pull this week's cards from my Trello board "Launch" and list them by status.
   ```

   You should see the AI use the `trello` tool and return the list.

4. Try the flagship unified flow:
   ```
   Draft a kickoff email to the design team, create a card "Design review"
   on "Launch" in Trello, and design a "Q3 Update" newsletter via Canva
   using my existing template. Save the email and newsletter as drafts first.
   ```

---

## 6. Verification checklist

- [ ] Jan launches and model loads (offline OK).
- [ ] All 4 MCP servers show "Connected".
- [ ] AI can **read** Trello/Monday (`tasks`)
- [ ] AI can **create** a card/board item.
- [ ] AI can draft an email to "Drafts" (review before send).
- [ ] AI can list + edit a Canva template and send a newsletter.

---

## 7. Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| "MCP server not found" | Missing runtime (`uvx`/node) | Install `uv` (`pip install uv`) or `npx`; re-check install path |
| Tool call fails | Stale/scoped token | Regenerate API token; expand OAuth scopes |
| Model won't call tools | Wrong/non-tool model | Use 7B+ model with tool-calling support |
| Canva returns nothing | OAuth missing scope | Re-auth and grant `templates:read` + `create` |
| Slow on CPU | Model too big | Switch to 4B quantized local model |

---

## 8. Extend to other roles (the payoff)

To add a **Designer** or **Founder** profile, you don't rebuild the product:

1. Copy `pm-profile.yaml` → `designer-profile.yaml`.
2. Change the `role`, swap which `skills` list and which `mcp_servers` it needs.
3. Point it at the same Jan core.

The shell stays the same — only the wiring changes. That's the "role-agnostic"
core of the concept.

---

## 9. Recommended starter skills library

- `email.write` — tone-matched drafting.
- `project.read` / `project.write` — task PMT bindings.
- `newsletter.from-template` — Canva→email pipeline.
- `daily.brief` — unified "today" from email+tasks.
- `meeting.minutes` → `project.create` — notes-to-tasks.

---

## 10. Next steps / roadmap notes

- Add **calendar** and **CRM** MCP servers for richer daily briefs.
- Wire a lightweight **log/audit** so every agent action is traceable.
- Add scheduled/batch skills (auto "Monday morning brief").
- Optional shared team deployment (local remains default).

You now have a working, local-first **DIY Command Center** that is the
role-agnostic foundation — the PM profile is just your first profile.