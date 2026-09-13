# Llamingo Films Design System

This file is the visual source of truth for the site. Page-specific files under `pages/` may override it.

## Direction

- **Product:** Ecuadorian creative agency and audiovisual production company.
- **Personality:** bold, irreverent, cinematic, warm, precise.
- **Presentation:** editorial brutalism with visible production language: chapters, frames, scene labels, contact sheets, markers, and hard borders.
- **Narrative:** scroll-triggered storytelling. The page must remain complete and understandable without animation.
- **Density:** spacious section rhythm with compact production metadata.

## Brand Palette

| Role | Value | Token |
| --- | --- | --- |
| Ink | `#0a0a0a` | `--ink` |
| Paper | `#f1eadf` | `--paper` |
| Signal orange | `#ff4d23` | `--signal` |
| Production blue | `#3478f6` | `--brand-blue` |
| Electric blue | `#108bea` | `--blue` |
| Highlight yellow | `#ffd21f` | `--yellow` |
| Acid lime | `#d8ff3e` | `--lime` |

Use ink and paper for legibility. Orange leads calls to action and chapter climaxes. Blue communicates production and territory. Yellow and lime are short highlights, not background defaults. Do not introduce a new dominant hue without a brand decision.

## Typography

- Use a system grotesk stack (`Arial`, `Helvetica`, sans-serif) for fast, blunt, production-poster typography.
- Headings use heavy weights, uppercase where the composition benefits, compact line-height, and zero letter spacing.
- Use Georgia italic only as a controlled editorial contrast in short phrases.
- Production labels may use a monospace stack at 8-11px with positive letter spacing.
- Body copy is at least 16px when it carries substantial reading; compact captions may be smaller when contrast and hierarchy remain clear.

## Geometry

- Corners stay square or nearly square.
- Borders are visible and purposeful, normally 1-3px.
- Shadows are hard offsets, not soft floating-card shadows.
- Repeated media keeps a declared aspect ratio to prevent layout shifts.
- Sections are full-width chapters; avoid placing page sections inside decorative cards.

## Motion Identity

- **Signature interaction:** masked scene reveal followed by a gentle image settle.
- **Signature easing:** `cubic-bezier(.16,1,.3,1)`.
- **Durations:** fast `160ms`, standard `520ms`, slow `760ms`.
- **Primary layer:** chapter headline or scene media.
- **Secondary layer:** metadata, frame, or card stagger.
- **Ambient layer:** grain, tape, orbit, or signal noise at low amplitude.
- One focal movement per viewport. Ambient layers pause or disappear when they no longer support the scene.

Scroll progress is functional: it communicates the chapter structure. Use native scrolling; do not add delayed scroll smoothing or scroll hijacking.

## Chapter Pattern

1. **Hook:** Llamingo mascot, literal offer, and service choices.
2. **Idea:** four connected creative capabilities.
3. **Proof:** selected cases and production statistics.
4. **Journey:** audiovisual, BTL, and digital scenes.
5. **People:** the team as a coherent editorial gallery.
6. **Territory:** interactive Ecuador coverage.
7. **Climax:** direct invitation to start a project.

Each chapter may end with one contextual action. The final contact action remains the strongest.

## Interaction

- Interactive targets are at least 44x44px on touch surfaces.
- Hover must never be the only way to reveal essential information.
- Focus states use a clearly visible yellow outline.
- Hover movement stays within 8px and must not shift surrounding layout.
- Forms keep visible labels, autocomplete hints, inline status, Escape-to-close behavior, and focus restoration.

## Responsive Rules

- Recompose mobile chapters instead of scaling desktop coordinates.
- Hide the desktop chapter rail below 1100px; the top progress line remains.
- Reduce reveal distance and simultaneous animation on mobile.
- Editorial galleries may scroll horizontally when each card is clearly visible and touch-friendly.
- Never allow headings, controls, captions, or map overlays to overlap incoherently.

## Reduced Motion

Under `prefers-reduced-motion: reduce`:

- Render all content in its final state.
- Remove parallax, ambient text fields, orbit loops, marquee motion, and large image zooms.
- Keep direct state feedback and visible focus.
- Stop the automatic map rotation and preserve manual region controls.

## Pre-Delivery Checks

- Verify 375px, 768px, 1024px, and 1440px layouts.
- Confirm no horizontal page scroll or content hidden behind the fixed navigation.
- Confirm the first frame is meaningful before client animation starts.
- Confirm refresh at any scroll position does not leave content hidden.
- Confirm keyboard navigation, modal focus, map controls, and reduced motion.
- Confirm no runtime errors and a successful production build.
