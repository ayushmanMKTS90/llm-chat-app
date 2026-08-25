---
version: alpha
name: LLM-Chat-App-design-system
description: |
  A terminal-first, developer-centric chat interface blending Vercel's black-and-white precision
  with Ollama's minimal documentation aesthetic. Pure black primary on white canvas, full-pill
  interactive elements, system font stack, hairline borders only — no gradients, no shadows,
  no decorative chrome. The interface gets out of the way; the conversation is the product.

colors:
  primary: "#000000"
  on-primary: "#ffffff"
  ink: "#000000"
  ink-deep: "#090909"
  charcoal: "#525252"
  body: "#737373"
  mute: "#a3a3a3"
  canvas: "#ffffff"
  canvas-soft: "#fafafa"
  surface-card: "#ffffff"
  hairline: "#e5e5e5"
  hairline-strong: "#d4d4d4"
  on-dark: "#ffffff"
  on-dark-mute: "rgba(255,255,255,0.7)"
  surface-dark: "#171717"
  focus-ring: "rgba(59,130,246,0.5)"
  link: "#000000"
  link-mute: "#737373"
  success: "#27c93f"
  success-soft: "#dcfce7"
  error: "#ef4444"
  error-soft: "#fef2f2"
  warning: "#f5a623"
  warning-soft: "#fffbeb"

typography:
  display-xl:
    fontFamily: Geist, system-ui, -apple-system, sans-serif
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.11
    letterSpacing: -0.02em
  display-lg:
    fontFamily: Geist, system-ui, -apple-system, sans-serif
    fontSize: 30px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.02em
  heading-lg:
    fontFamily: Geist, system-ui, -apple-system, sans-serif
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: -0.01em
  heading-md:
    fontFamily: system-ui, -apple-system, sans-serif
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  heading-sm:
    fontFamily: system-ui, -apple-system, sans-serif
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.56
    letterSpacing: 0
  body-md:
    fontFamily: system-ui, -apple-system, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-strong:
    fontFamily: system-ui, -apple-system, sans-serif
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0
  body-sm:
    fontFamily: system-ui, -apple-system, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: 0
  body-sm-strong:
    fontFamily: system-ui, -apple-system, sans-serif
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.43
    letterSpacing: 0
  caption-sm:
    fontFamily: system-ui, -apple-system, sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: 0
  code-md:
    fontFamily: Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  code-sm:
    fontFamily: Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: 0
  button-md:
    fontFamily: system-ui, -apple-system, sans-serif
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0

rounded:
  none: 0px
  sm: 6px
  md: 8px
  lg: 12px
  full: 9999px

spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 32px
  section: 88px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: 8px 20px
    height: 36px
  button-primary-active:
    backgroundColor: "{colors.ink-deep}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: 8px 20px
    height: 36px
    borderColor: "{colors.hairline-strong}"
    borderWidth: 1px
  button-pill-on-dark:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: 8px 20px
  button-disabled:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.mute}"
    rounded: "{rounded.full}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: 8px 16px
  search-pill:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    padding: 8px 16px
    height: 36px
  search-pill-focused:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: 8px 16px
    height: 40px
    borderColor: "{colors.hairline}"
    borderWidth: 1px
  text-input-focused:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    borderColor: "{colors.focus-ring}"
    borderWidth: 2px
  textarea-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 12px 16px
    borderColor: "{colors.hairline}"
    borderWidth: 1px
  textarea-input-focused:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    borderColor: "{colors.focus-ring}"
    borderWidth: 2px
  install-snippet:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.code-md}"
    rounded: "{rounded.full}"
    padding: 12px 20px
    height: 48px
  command-tag:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.code-sm}"
    rounded: "{rounded.full}"
    padding: 6px 12px
  terminal-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.code-sm}"
    rounded: "{rounded.lg}"
    padding: 16px
    borderColor: "{colors.hairline}"
    borderWidth: 1px
  terminal-traffic-lights:
    rounded: "{rounded.full}"
    size: 12px
  chat-message-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 16px
  chat-message-card-soft:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 16px
  pricing-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 32px
    borderColor: "{colors.hairline}"
    borderWidth: 1px
  pricing-card-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  feature-bullet:
    textColor: "{colors.charcoal}"
    typography: "{typography.body-sm}"
  faq-row:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 16px 0px
  link-inline:
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
  link-mute:
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
  primary-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.none}"
    height: 56px
    borderColor: "{colors.hairline}"
    borderWidth: 1px
  sidebar-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    borderColor: "{colors.hairline}"
    borderWidth: 1px
  footer-section:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    typography: "{typography.caption-sm}"
    rounded: "{rounded.none}"
    padding: 32px 24px
  cta-strip-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.heading-lg}"
    rounded: "{rounded.lg}"
    padding: 24px 32px
  avatar:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
  badge:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.body}"
    typography: "{typography.caption-sm}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  badge-success:
    backgroundColor: "{colors.success-soft}"
    textColor: "{colors.success}"
    typography: "{typography.caption-sm}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  badge-warning:
    backgroundColor: "{colors.warning-soft}"
    textColor: "{colors.warning}"
    typography: "{typography.caption-sm}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  badge-error:
    backgroundColor: "{colors.error-soft}"
    textColor: "{colors.error}"
    typography: "{typography.caption-sm}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  dropdown-menu:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 4px
    borderColor: "{colors.hairline}"
    borderWidth: 1px
  modal-overlay:
    backgroundColor: "rgba(0,0,0,0.5)"
  modal-content:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  tooltip:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: 6px 10px

---

## Overview

This design system blends **Vercel's precision** (Geist font, black/white system, hairline borders) with **Ollama's terminal minimalism** (pill-shaped everything, center-aligned hero, documentation-first philosophy). The result: a chat interface that feels like a well-crafted CLI tool — fast, focused, zero-distraction.

**Core Philosophy:**
- **Conversation is king** — every pixel serves the chat
- **Terminal aesthetic** — monospace code, pill buttons, flat surfaces
- **Zero decoration** — no gradients, shadows, or marketing chrome
- **System fonts** — Geist for display, system-ui for body, Geist Mono for code
- **Black primary** — pure `#000000` pills for every primary action

## Colors

### Brand & Accent
- **Pure Black** (`{colors.primary}` — `#000000`): The brand. Every primary CTA, every black pill, every solid icon. No other brand color.
- **Ink Deep** (`{colors.ink-deep}` — `#090909`): Pressed-state black for primary pills.

### Surface
- **Canvas** (`{colors.canvas}` — `#ffffff`): The page background. Nearly every surface.
- **Canvas Soft** (`{colors.canvas-soft}` — `#fafafa`): Secondary surfaces, hover states, alternating rows.
- **Surface Dark** (`{colors.surface-dark}` — `#171717`): Inverted cards (code blocks, thinking indicators).
- **Hairline** (`{colors.hairline}` — `#e5e5e5`): 1px borders — cards, dividers, inputs.
- **Hairline Strong** (`{colors.hairline-strong}` — `#d4d4d4`): Stronger borders for secondary buttons.

### Text
- **Ink** (`{colors.ink}` — `#000000`): Headlines, primary text on light surfaces.
- **Charcoal** (`{colors.charcoal}` — `#525252`): Secondary emphasis, disabled copy.
- **Body** (`{colors.body}` — `#737373`): Default body color — the system's most-used text color after black.
- **Mute** (`{colors.mute}` — `#a3a3a3`): Captions, placeholder text, lowest emphasis.
- **On Dark** (`{colors.on-dark}` — `#ffffff`): Primary text on dark surfaces.
- **On Dark Mute** (`{colors.on-dark-mute}` — `rgba(255,255,255,0.7)`): Secondary text on dark.

### Semantic
- **Success** (`{colors.success}` — `#27c93f`): Terminal green, completion states.
- **Error** (`{colors.error}` — `#ef4444`): Destructive actions, failures.
- **Warning** (`{colors.warning}` — `#f5a623`): Pending states, cautions.

### Focus
- **Focus Ring** (`{colors.focus-ring}` — `rgba(59,130,246,0.5)`): Translucent blue ring — the only blue in the system.

## Typography

### Font Family
- **Geist** (display) — Vercel's geometric sans, weights 500/600. Falls back to `system-ui`.
- **system-ui** (body) — OS default sans. Carries all non-display text. No branded body face.
- **Geist Mono** (code) — Monospace for code blocks, inline code, technical labels. Falls back to `ui-monospace`.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 36px | 600 | 1.11 | -0.02em | Hero headline, empty state |
| `{typography.display-lg}` | 30px | 600 | 1.2 | -0.02em | Section headlines |
| `{typography.heading-lg}` | 24px | 600 | 1.33 | -0.01em | Card titles, settings sections |
| `{typography.heading-md}` | 20px | 500 | 1.4 | 0 | Conversation titles |
| `{typography.heading-sm}` | 18px | 500 | 1.56 | 0 | Message metadata |
| `{typography.body-md}` | 16px | 400 | 1.5 | 0 | Default body, chat messages |
| `{typography.body-strong}` | 16px | 500 | 1.5 | 0 | Emphasized inline, nav links |
| `{typography.body-sm}` | 14px | 400 | 1.43 | 0 | Secondary UI, timestamps |
| `{typography.body-sm-strong}` | 14px | 500 | 1.43 | 0 | Button labels, pill text |
| `{typography.caption-sm}` | 12px | 400 | 1.33 | 0 | Footer, metadata |
| `{typography.code-md}` | 16px | 400 | 1.5 | 0 | Code blocks, install snippets |
| `{typography.code-sm}` | 14px | 400 | 1.43 | 0 | Inline code, tool calls |
| `{typography.button-md}` | 14px | 500 | 1 | 0 | Every button label |

### Principles
- **Display**: Geist 600, negative tracking, sentence-case
- **Body**: system-ui 400, neutral tracking, maximum readability
- **Code**: Geist Mono 400, technical contexts only
- **No italics, no 700+ weights, minimal letter-spacing variation**

## Layout

### Spacing System
- **Base unit**: 8px (with 2/4/6px micro-steps)
- **Tokens**: `{spacing.xxs}` 2px · `{spacing.xs}` 4px · `{spacing.sm}` 8px · `{spacing.md}` 12px · `{spacing.lg}` 16px · `{spacing.xl}` 24px · `{spacing.xxl}` 32px · `{spacing.section}` 88px
- **Section rhythm**: 88px between major blocks (hero → chat → input)
- **Card padding**: 16px (chat), 32px (settings cards)
- **Pill padding**: 8px vertical · 20px horizontal (36px height)

### Grid & Container
- **Max width**: 960px for chat, 720px for settings/reading
- **Chat layout**: Sidebar (280px) + Main (flex-1) on desktop
- **Mobile**: Drawer sidebar, full-width chat

### Whitespace Philosophy
Generous vertical rhythm (`{spacing.section}`) separates major zones. Inside chat, tight message stacking (`{spacing.md}`). The page breathes like a terminal output — dense where needed, airy where it matters.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 — Flat | No border, no shadow | Hero, chat messages, most surfaces |
| 1 — Hairline | 1px `{colors.hairline}` | Cards, inputs, dropdowns, modals |
| 2 — Inverted Dark | `{colors.surface-dark}` fill | Code blocks, thinking indicators, Max-tier cards |

**No drop shadows.** Depth = surface ladder + hairline borders only.

## Shapes

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Nav bars, footer, full-bleed dividers |
| `{rounded.sm}` | 6px | Rare inline chips |
| `{rounded.md}` | 8px | Dropdown menus, tooltips |
| `{rounded.lg}` | 12px | Chat cards, code blocks, settings cards |
| `{rounded.full}` | 9999px | **Every button, every input, every pill, every avatar** |

**Dominant vocabulary**: Pills (`full`) for interactive, `lg` (12px) for cards. Nothing in between.

## Components

### Buttons

**`button-primary`** — Universal black pill CTA
- Background `{colors.primary}`, text `{colors.on-primary}`, `{typography.button-md}`, 36px tall, `{rounded.full}`, padding `8px 20px`
- Used for: Send message, New chat, Primary actions
- Active: `{colors.ink-deep}`

**`button-secondary`** — White pill with hairline border
- Background `{colors.canvas}`, text `{colors.ink}`, 1px `{colors.hairline-strong}`, same sizing
- Used for: Secondary actions, Cancel, Outline variants

**`button-ghost`** — Transparent pill
- Transparent background, `{colors.ink}` text, `{rounded.full}`
- Used for: Toolbar actions, Icon buttons with labels

**`button-pill-on-dark`** — White pill on dark surface
- For inverted contexts (code blocks, dark cards)

**`button-disabled`** — Soft gray pill
- `{colors.canvas-soft}` background, `{colors.mute}` text

### Inputs & Forms

**`search-pill`** — Centered search/command input
- `{colors.canvas-soft}` background, `{rounded.full}`, 36px tall
- Focused: `{colors.canvas}` + `{colors.focus-ring}` 2px ring

**`text-input`** — Standard pill input
- `{colors.canvas}` background, 1px `{colors.hairline}`, `{rounded.full}`, 40px tall
- Focused: 2px `{colors.focus-ring}`

**`textarea-input`** — Chat input area
- `{colors.canvas}`, 1px `{colors.hairline}`, `{rounded.lg}` (12px), auto-resize
- Focused: 2px `{colors.focus-ring}`

**`install-snippet`** — Copyable command pill
- `{colors.canvas-soft}`, `{typography.code-md}`, `{rounded.full}`, 48px tall
- Copy icon at right edge

**`command-tag`** — Inline command chip
- `{colors.canvas-soft}`, `{typography.code-sm}`, `{rounded.full}`

### Chat & Messages

**`chat-message-card`** — User/assistant message container
- `{colors.canvas}`, `{rounded.lg}`, 16px padding, hairline border
- Avatar (pill), content, actions (copy, regenerate, fork)

**`chat-message-card-soft`** — System/tool messages
- `{colors.canvas-soft}` background for visual distinction

**`terminal-card`** — Code blocks, tool outputs
- `{colors.canvas}`, 1px `{colors.hairline}`, `{rounded.lg}`, `{typography.code-sm}`
- macOS traffic lights in header (red/yellow/green 12px dots)

### Navigation

**`primary-nav`** — Top bar (56px)
- `{colors.canvas}`, 1px bottom `{colors.hairline}`
- Logo left, search pill center, user menu right

**`sidebar-nav`** — Conversation list (280px)
- `{colors.canvas}`, 1px right `{colors.hairline}`
- Conversation items: title, preview, model badge, date
- Hover: `{colors.canvas-soft}` background

### Feedback

**`badge`** — Metadata pills (model, provider, status)
- `{colors.canvas-soft}` / `{colors.body}`, `{rounded.full}`, `{typography.caption-sm}`

**`badge-success/warning/error`** — Semantic status pills

**`dropdown-menu`** — Action menus
- `{colors.canvas}`, 1px `{colors.hairline}`, `{rounded.md}`

**`modal-overlay` + `modal-content`** — Dialogs (approval, settings)
- Overlay: `rgba(0,0,0,0.5)`, Content: `{colors.canvas}`, `{rounded.lg}`, 24px padding

**`tooltip`** — Hover hints
- `{colors.ink}` background, `{colors.on-primary}` text, `{rounded.sm}`

## Do's and Don'ts

### Do
- Treat the page like a terminal: single column, generous section spacing, no decorative dividers
- Use `{component.button-primary}` (black pill) for every primary action
- Default to `{rounded.full}` for any interactive element. Cards get `{rounded.lg}` (12px)
- Use `{typography.display-xl}` Geist 600 for hero, `{typography.body-md}` system-ui for everything else
- Reserve `{component.pricing-card-dark}` (inverted dark) for exactly one "look here" moment per view
- Render code in `{component.terminal-card}` with `{typography.code-sm}` — code is first-class
- Keep the interface invisible — the conversation is the product

### Don't
- Don't introduce gradients, drop shadows, or atmospheric backgrounds
- Don't add brand colors beyond black/white/gray + semantic (success/error/warning)
- Don't soften pills or sharpen cards — pills stay `full`, cards stay `lg`
- Don't lift cards with shadows. Use hairline border or invert to dark
- Don't replace `system-ui` with a branded body face
- Don't fill the chat with marketing chrome — every element earns its place

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| desktop-xl | 1440px+ | Full sidebar (280px), chat max 960px |
| desktop | 1024px | Sidebar 260px, chat flex-1 |
| tablet | 768px | Sidebar → drawer, chat full-width |
| mobile | 640px | Hero headline 36px→28px, pills 36px→40px touch target |

### Touch Targets
- All pills: 36px desktop → 40px mobile (exceeds 44×44 AAA via padding)
- Inputs: 40px → 44px mobile
- Buttons: 36px → 44px mobile

### Collapsing Strategy
- **Sidebar**: Persistent desktop → drawer mobile (hamburger in nav)
- **Search pill**: Fixed width desktop → full-width mobile overlay
- **Chat**: Max-width centered desktop → full-width mobile
- **Section spacing**: 88px desktop → 64px tablet → 48px mobile

## Dark Mode

### Color Mapping (CSS Variables)
```css
:root {
  --canvas: #ffffff;
  --canvas-soft: #fafafa;
  --ink: #000000;
  --body: #737373;
  --hairline: #e5e5e5;
  --surface-dark: #171717;
  --on-dark: #ffffff;
}

.dark {
  --canvas: #0a0a0a;
  --canvas-soft: #171717;
  --ink: #ffffff;
  --body: #a3a3a3;
  --hairline: #272727;
  --surface-dark: #ffffff;
  --on-dark: #000000;
}
```

**Dark mode = inverted canvas**. Primary black pill stays black. Hairlines darken. Code blocks (`surface-dark`) become white.

## Iteration Guide

1. One component at a time. Pull YAML from front matter, verify every token resolves
2. Reference tokens directly (`{colors.primary}`, `{rounded.full}`) — never hardcode
3. Run `npx @google/design.md lint DESIGN.md` after edits
4. Add variants as separate entries (`-active`, `-focused`, `-disabled`)
5. Default body to `{typography.body-md}`; reserve `{typography.display-xl}` for page-top only
6. Keep `{colors.primary}` scarce — at most one black pill per fold
7. Before new component: can it be expressed with existing pill + card + terminal vocabulary?