---
name: Command Center (Console)
description: Role-agnostic local-first command console; a dark engineering desk where every connected tool is a queue row and every request is a command line.
colors:
  canvas: "#010102"
  surface-1: "#0f1011"
  surface-2: "#141516"
  surface-3: "#18191a"
  hairline: "#23252a"
  hairline-strong: "#34343a"
  ink: "#f7f8f8"
  ink-muted: "#d0d6e0"
  ink-subtle: "#8a8f98"
  ink-tertiary: "#62666d"
  primary: "#5e6ad2"
  primary-hover: "#828fff"
  primary-focus: "#5e69d1"
  on-primary: "#ffffff"
  success: "#27a644"
  black: "#000000"
typography:
  display:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: "clamp(40px, 7vw, 80px)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: "clamp(32px, 4.5vw, 52px)"
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  cta:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: "clamp(30px, 4vw, 44px)"
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: "16px"
    lineHeight: 1.5
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 500
    letterSpacing: "0.02em"
  scale:
    micro: "10px"
    stamp: "11px"
    label: "12px"
    command: "13px"
    body-sm: "14px"
    nav: "15px"
    body: "16px"
    lede: "18px"
    card-title: "20px"
    panel-title: "22px"
    display-sm: "30px"
    display-md: "32px"
    display-lg: "40px"
    display-xl: "44px"
    display-2xl: "52px"
    display-3xl: "80px"
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  md2: "10px"
  lg: "12px"
  xl: "16px"
  pill: "999px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: "8px 14px"
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
  status-badge:
    border: "1px {colors.hairline-strong}"
    rounded: "{rounded.pill}"
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "11px"
---

# Design System: Command Center (Console)

## Overview

**Creative North Star: "The command line is the desk."**

The Command Center is rendered as a working engineering console, not a
dashboard. The near-black canvas is one desk; every MCP-connected tool is a
queue row (a cue); every request is a command line you draft, review, then run.
The signature is a dense, precise, product-screenshot-led page in the voice of
Linear (dark canvas, four-step surface ladder, scarce lavender) cross-bred with
Vercel (Geist type, mono technical labels, stacked hairline shadows). It refuses
both the generic light-SaaS hero-card layout and the cinematic "control room"
cliché.

The world earns trust through precision and restraint: one chromatic accent
reserved for brand mark, focus, and the active queue row; one semantic green for
live/connected/GO; hairline borders instead of gradients for elevation. Roles are
tabs on the same desk; status is a stamped badge (STANDBY / GO / HOLD); tools are
mono labels appended to an action.

**Key Characteristics:**
- Near-black canvas with a four-step surface ladder and hairline borders, no gradients
- Geist sans (400-600, negative tracking) for all narrative; Geist Mono only for the technical layer
- One chromatic accent (Linear lavender) + one semantic green; nothing else saturated
- Stacked-hairline elevation and pillow shadows, never glow/blur beyond the sticky nav
- A working Run cue control that stamps the log rather than animating it

## Colors

A near-black console palette: four-step neutral surface ladder, ink text built from
muted grays, and a single functional accent pair. Color does the least work; line
and density carry the identity.

### Primary
- **Lavender** (#5e6ad2): The single chromatic accent. Appears only as the brand
  mark, the active queue row, the command prompt, primary CTA, and focus rings.
  primary-hover (#828fff) lifts on hover, primary-focus (#5e69d1) marks keyboard focus.
- **Canvas / Ink** (#010102 / #f7f8f8): ground and headline text; ink-muted
  (#d0d6d9) for body, ink-subtle (#8a8f98) for labels, ink-tertiary (#62666b) for
  the quietest notes.

### Semantic
- **Success** (#27a644): only where a connection is live, a tool is connected, or
  a cue is GO. Used sparingly as a stamped badge fill or hairline+border.

### Neutral
- **Surface ladder**: surface-1 (#0f1011) panels/cards, surface-2 (#141516) rails,
  surface-3 (#18191a) active fills. **Hairline** (#23252a) borders and rules,
  **hairline-strong** (#34343a) for edges that must read.

### Named Rules
**The Lavender-Rarity Rule.** Lavender appears on a page only where a live action
sits — mark, focus, active cue, primary CTA. Scattered accents have lost the
single-voice scan line.
**The Hairline-Elevation Rule.** Beside the one hero app panel, nothing floats.
Depth is stacked hairlines and pillow shadows, never gradient bands or neon glow.

## Typography

**Sans:** Geist (400/500/600) — the narrative voice, geometric and neutral.
**Mono:** Geist Mono (400/500/600) — the technical layer: queue rows, statuses,
command line, tags, badges, prompts.

**Character:** A dense, precise grotesk over a restrained geometric sans; the
mono layer reads as the product's actual machine interface rather than a costume.
Headlines get negative tracking to keep them tight; narrative runs sentence case.

### Hierarchy
- **Display** (600, clamp(40px→80px), lh 1.05, ls -.04em): single hero statement.
- **Headline** (600, clamp(32px→52px), lh 1.1, ls -.035em): section heads.
- **CTA** (600, clamp(30px→44px)): closing statement.
- **Card title** (500/600, 20-22px, ls -.02em): panels and cards.
- **Body** (400/500, 15-16px, lh 1.5): running copy; measure ~52ch.
- **Lede** (16-18px, ink-muted): hero intro and section leads.
- **Label / Mono** (Geist Mono, 10-13px, ls .02-.06em): stamps, badges, cues, prompts.

### Named Rules
- **The Machine-Layer Rule.** Any mono string under ~13px carries the world's
  data — cue numbers, statuses, timestamps, tool labels. It never doubles as the
  persuasive headline or body.

## Layout

A single max-width column (1200px container, 24px side padding, centered). The
hero is a centered statement sitting above the product protagonist — a wide app
panel (surface-1, 16px corners, stacked pillow shadow) showing a sidebar of
console sections, a `Project: Launch` queue table with status badges, and a
command line with a Run cue control. Sections stack with strong vertical rhythm
(88px); headings always clear space above > below. The app side rail collapses to
a horizontal scroll strip under 96hex.

## Elevation & Depth

Depth is invented entirely, via stacked hairlines and pillow shadows. The one
hero app panel carries a real 4-layer pillow shadow (`0 0 0 1px` the hairline +
1px/1px + 2px/2px + 8px/16px -4px). Everything else stays flat; selection is a
lavender field over on-primary ink. No neon, no glass blur beyond a light 8px nav
backdrop.

### Named Rules
- **The One-Panel Rule.** One object owns the shadow stack (the app panel). A
  second floating, shadowed element says the world is material, and it isn't.

## Shapes

Hairline-square print geometry: 4px stamps/tags, 6px buttons, 8px md surfaces,
10px input, 12px cards, 16px the app panel. Pill (999px) reserved for badges,
status chips, and pill CTAs. The identity lives in hairlines and tab rails, not in
radius.

## Components

### Buttons
- **Pill CTA** (`btn-pill`): 999px, 10px/20px, clear of the "pill only for action"
  tier in hero and CTA sections.
- **Small (`btn-sm`)**: 32px height for the sticky nav.
- **Primary**: lavender fill, on-primary text; hovers to primary-hover.
- **Secondary**: canvas fill, hairline-strong border; hovers to surface-1.
- **Ghost**: transparent, hairline border.
- **Inverse**: ink fill, canvas text for the mid-page anchor CTA.

### Tabs / Rails
Sidebar (console sections) horizontal-scrolls on mobile; role profile tabs along
the top carry a 2px bordered bottom-rule to mark the active state.

### Chips
Mono 11px, hairline-strong border, ink-muted text, 999px radius; inert.

### Cards / Containers
- Corner 12px (16px for the hero app panel); surface-1; 1px hairline border.

### Cue-sheet (signature)
The ruled queue table is the centerpiece: columns Cue/Dept/Action/Status, thin row
rules, mono cue + dept labels, and stamped status badges. The active row is
surface-2 with a 2px lavender inset. The command line carries a lavender `$`
prompt, mono text, and a Run cue control that stamps the log line.

## Do's and Don'ts

### Do:
- **Do** lead the hero with a courteous, sentence-case headline carrying its own
  weight — no kicker above it.
- **Do** keep lavender to the note: brand mark, focus, active row, primary CTA.
- **Do** show status as a stamped badge (STANDBY / GO / HOLD), not a chart.
- **Do** label in demo as synthetic and keep invented claims generous.

### Don't:
- **Don't** overload a hero with a generic light-SaaS card stack or hero-metric stats.
- **Don't** introduce a display face, gradient text, or a second anecdote accent.
- **Don't** shadow everything — the shadow stack belongs on one panel.
- **Don't** ship glyph/emoji icon tiles; a queue row is text over a hairline, not
  an icon grid.