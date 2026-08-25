---
name: Command Center (Editorial)
description: A warm editorial command desk. Indigo-navy hero, warm white body, deep-teal closing band; Comfortaa rounded-sans body over DM Serif Display headlines.
colors:
  primary: "#1b1938"
  primary-deep: "#0e0c1f"
  on-primary: "#ffffff"
  ink: "#292827"
  ink-mute: "#73706d"
  ink-faint: "#9a9794"
  canvas: "#ffffff"
  canvas-soft: "#fafaf8"
  surface-violet-soft: "#c9b4fa"
  surface-violet-hover: "#d6c7fb"
  surface-teal-deep: "#0e3030"
  surface-teal-mid: "#155555"
  surface-teal-hover: "#eef2f1"
  hairline: "#e8e4dd"
  hairline-dark: "#3f3a52"
  on-dark-mute: "#bcbac9"
  on-dark-faint: "#5a5772"
  black: "#000000"
typography:
  display-xxl:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: 64px
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: 0
  display-xl:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: 48px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0
  display-lg:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: 28px
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: 0
  display-md:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: 0
  heading-lg:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0
  body-lg:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-md:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  button-md:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0
  button-cap:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0
  caption:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0
  micro:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0
  mono:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0
  scale:
    micro: "12px"
    caption: "14px"
    button: "14px"
    body-md: "16px"
    body-lg: "18px"
    heading-lg: "20px"
    display-md: "22px"
    display-lg: "28px"
    display-mobile: "36px"
    display-xl: "48px"
    display-xxl: "64px"
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
components:
  button-primary-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  button-on-dark-pill:
    backgroundColor: "{colors.surface-violet-soft}"
    textColor: "{colors.primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: "12px 20px"
  button-secondary-outline:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  button-on-teal:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.surface-teal-deep}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  card-feature-light:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: "32px"
  card-teal-band:
    backgroundColor: "{colors.surface-teal-deep}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.lg}"
    padding: "64px"
  pill-tab-light:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button-cap}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  nav-bar-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: "16px 24px"
---

# Design System: Command Center (Editorial)

## Overview

**Creative North Star: "The daily brief as a composed letterhead."**

The Command Center is presented as an editorial document from a local-first desk:
deep indigo-navy hero, a quiet warm-white body, and a deep-teal closing band —
the three-canvas rhythm of a high-end newsletter. Rounded Comfortaa carries the
body and interface with warmth; DM Serif Display voices the headlines in a
considered, slightly literary register. This is an intentional rejection of the
conventional dark-AI page: the type is human, the body ink is a warm grey (never
pure black), and the palette stays inside indigo / violet / teal / warm grey.

The system comes from the **Superhuman editorial** reference in
`awesome-design-md`, with the type voice overridden by user choice: Geist +
Geist Mono + DM Serif Display replace the reference's Inter substitute. Every
other rule travels: sub-default-like quiet weights, tight display leading
(0.96), a single CTA per band, pill only on the hero, rounded-rectangle CTAs
everywhere else, and the non-negotiable closing teal band.

**Key Characteristics:**
- Three-canvas rhythm: indigo navy hero, white body, deep teal closing band
- Geist body/UI + DM Serif Display editorial headlines; Geist Mono for the data layer
- Warm-grey ink (#292827) for body, never pure black
- Tight display leading (0.96) and restrained tracking
- Pill CTA on the hero only; 8px rounded-rectangle CTAs in the body
- Violet-sky atmospheric wash over the indigo hero, half-bleed product subject
- Every marketing page closes on a deep-teal band with a single white CTA
- Teal reads "connected / live"; indigo reads "action / brand"

## Colors

A three-canvas palette. The hero owns indigo navy; the body owns warm white; the
closing band owns deep teal. No fourth canvas color enters the page.

### Brand & Accent
- **Primary Indigo Navy** (#1b1938): hero canvas, primary CTA fill, featured
  cards. **Indigo Deep** (#0e0c1f) is the pressed-lift and deepest gradient stop.
- **Surface Violet Soft** (#c9b4fa): the hero pill CTA fill and atmospheric
  wash tint. Over indigo it reads as the single lifted action.
- **Surface Teal Deep** (#0e3030): the closing band. **Surface Teal Mid**
  (#155555): the live/connected semantic (statuses, connected chips, GO stamps).

### Surface
- **Canvas** (#ffffff): body background. **Canvas Soft** (#fafaf8): alternating
  feature rows. **Hairline** (#e8e4dd): 1px borders on light.
  **Hairline Dark** (#3f3a52): 1px borders on dark surfaces.

### Text
- **Ink** (#292827): default body, warm dark grey. **Ink Mute** (#73706d):
  secondary text. **Ink Faint** (#9a9794): tertiary/disabled.
- **On Primary** (#ffffff): text on indigo/teal. **On Dark Mute** (#bcbac9) and
  **On Dark Faint** (#5a5772): secondary/tertiary on dark.

### Named Rules
**The Three-Canvas Rule.** Indigo is the hero, white is the body, teal is the
close. A fourth canvas color breaks the system.
**The Teal-Is-Live Rule.** Teal mid appears only where something is connected or
GO — never as decoration.

## Typography

**Body / UI face:** Geist (geometric sans, 400/500/600).
**Display face:** DM Serif Display (warm high-contrast serif, 400).
**Data face:** Geist Mono (monospaced, 400/500) for cues, statuses, prompts, skill ids.

The pairing is the escape from the AI default: a precise, neutral geometric sans
carrying all reading and interface text, set against an editorial serif that
gives headlines weight and warmth. Geist Mono marks the technical layer of the
product — queue rows, stamps, the command line, skill identifiers — so the data
reads as machine notation, never as costume.

### Hierarchy
- **Display XXL** (DM Serif, 64px, lh .96): the single hero statement.
- **Display XL** (DM Serif, 48px, lh 1): section openers on light surfaces.
- **Display LG** (DM Serif, 28px, lh 1.14): feature titles and the teal close.
- **Display MD / Heading LG** (Geist 500, 22px/20px): card and panel titles.
- **Body LG** (Geist 400, 18px): leads. **Body MD** (16px): running copy.
- **Button MD / Cap** (Geist 600, 16px/14px): CTAs and pill tabs.
- **Caption / Micro** (Geist 400, 14px/12px): helper text and fine print.
- **Mono** (Geist Mono 400, 12px): cues, statuses, prompts, skill ids, demo tags.

### Named Rules
**The Rounded-Body Rule.** All reading and interface text is Geist. DM Serif is
reserved for headlines; a serif in body copy would read as a costume.
**The Quiet-Weight Rule.** Display is set at 400 — the serif's natural weight.
Never reach for a 700 to "punch up"; the editorial compression is the voice.
**The Data-Layer Rule.** Geist Mono appears only where the string is product
data — a cue id, a status, a command, a skill id, a demo tag. It never carries
the persuasive headline or body prose.

## Layout

Full-viewport indigo hero with the violet-sky atmospheric wash and a half-bleed
product subject on the right; type sits left in a ~960px column. The white body
centers ~1100px with generous editorial whitespace (section gaps ~96px).
Feature rows alternate canvas and canvas-soft. The closing teal band runs
edge-to-edge with up to 128px of vertical air and resolves with a single
white CTA. No kickers, no eyebrows; every heading carries its own weight.

## Elevation & Depth

Level 0 is flat everywhere except a single subtle card lift
(`0 1px 3px rgba(0,0,0,.08)`) on the hero product panel. The hero's depth is the
violet-sky atmospheric wash — a soft radial gradient of indigo → violet over the
navy canvas, implemented as CSS (no image). The white body stays flat; hairline
borders do the separation work.

### Named Rules
**The One-Lift Rule.** One card carries a shadow; everything else is flat
canvas and hairline. A second shadowed element says the page is material, and
it isn't.

## Shapes

Buttons are 8px rounded-rectangles (the system's signature shape) everywhere
except the hero, where the CTA is a full pill. Cards are 12px; the hero product
panel is 12px. Tags and stamps use 4px; inputs 6px; large feature cards 16px.

### Named Rules
**The Hero-Only Pill Rule.** Pills appear only on the indigo hero and the role
tab selector. Body CTAs are rounded-rectangles.

## Components

### Buttons
- **Hero pill**: violet-soft fill, indigo text, full radius — the lifted action.
- **Primary**: indigo fill, white text, 8px; pressed → indigo-deep.
- **Secondary**: white fill, warm-ink text, 1px hairline-dark border.
- **On teal**: white fill, teal-deep text, inside the closing band.

### Cards & Containers
- **Feature light**: white, 1px hairline, 12px, 32px padding.
- **Feature row**: canvas-soft, 8px, 24px padding.
- **Teal band**: teal-deep, white text, 64-128px padding, 12px (or radius-less
  when full-bleed).

### Signature: The Product Panel
The half-bleed subject in the hero is the Command Center itself, rendered as a
white product panel over the indigo: a "Project: Launch" queue table (CUE /
DEPT / ACTION / STATUS), live status stamps (Standby / Go / Hold), and a command
line with a Run cue control. Teal stamps read live; the active row lifts with an
indigo inset rule.

## Do's and Don'ts

### Do:
- **Do** use Geist for every body/UI string, DM Serif for headlines, Geist Mono for data strings only.
- **Do** close the page with the deep-teal band and a single white CTA.
- **Do** keep the pill on the hero (and tab selector) — body CTAs are 8px.
- **Do** set body ink in warm grey #292827, never pure black.
- **Do** label demo data as synthetic.

### Don't:
- **Don't** add a fourth canvas color or a new accent — indigo/violet/teal/warm
  grey are the closed palette.
- **Don't** use pill buttons in the body.
- **Don't** render a serif in body copy or push display weight past 400.
- **Don't** use Geist Mono for narrative prose — it belongs to data strings only.
- **Don't** stack more than one CTA per band.