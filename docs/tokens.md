# Design tokens

**Living reference:** run the app and open `/styleguide` for specimens, shadcn mapping, and system audit notes.

Source: [`src/app/globals.css`](../src/app/globals.css), mapped into Tailwind in [`tailwind.config.ts`](../tailwind.config.ts). shadcn theme variables alias the same semantics (see style guide).

Two tiers. **Primitives** are raw values and are never used directly in components. **Semantic** tokens are what components use; each theme reassigns them.

- **Plate** (light) — specimen mount board: cool neutral paper, near-black ink.
- **Cabinet** (dark) — a dark specimen cabinet: green-black surfaces, pale ink.

The photographs carry the colour. The UI stays neutral apart from one accent, *specimen-pin green*, used for the primary action, focus rings (`--ring` → `--accent`), slider thumbs, and the "copied" state.

## Primitives

| Token | Value | Notes |
|-------|-------|-------|
| `--paper-50` | `#f7f7f4` | Input wells (plate) |
| `--paper-100` | `#eeeeea` | Page (plate) |
| `--paper-200` | `#e4e4de` | Raised panels (plate) |
| `--paper-300` | `#c9cbc4` | Rules / borders (plate) |
| `--ink-950` | `#0f1110` | Page (cabinet), primary text (plate), cabinet sunken wells |
| `--ink-900` | `#181b19` | Raised panels (cabinet) |
| `--ink-700` | `#343935` | Rules / borders (cabinet) |
| `--ink-600` | `#4f544f` | Legacy mid ink |
| `--ink-500` | `#858a86` | Muted text (cabinet) |
| `--ink-400` | `#9da39c` | Legacy cabinet muted |
| `--ink-100` | `#e9ebe6` | Primary text (cabinet) |
| `--pin-700` | `#1f6b4f` | Accent (plate) |
| `--pin-300` | `#7fd1a8` | Accent (cabinet) |

## Semantic

| Token | Tailwind | Plate | Cabinet |
|-------|----------|-------|---------|
| `--surface-page` | `bg-page` | paper-100 | ink-950 |
| `--surface-raised` | `bg-raised` | paper-200 | ink-900 |
| `--surface-sunken` | `bg-sunken` | paper-50 | ink-950 |
| `--text-primary` | `text-ink` | ink-950 | ink-100 |
| `--text-muted` | `text-muted-foreground` | ink-700 | ink-500 |
| `--line` | `border-line` | paper-300 | ink-700 |
| `--accent` | `bg-accent` / `text-accent` | pin-700 | pin-300 |
| `--on-accent` | `text-on-accent` | paper-50 | ink-950 |
| `--radius-plate` | `rounded-plate` | 2px | 2px |
| `--ease-settle` | — | `cubic-bezier(0.2, 0.7, 0.2, 1)` | same |

### Contrast (WCAG 2.2 AA)

Approximate ratios, measured on the darkest surface each pair appears on:

| Pair | Plate | Cabinet |
|------|-------|---------|
| Primary text on page | ~16:1 | ~15:1 |
| Muted text on raised | ~9.2:1 | ~5.4:1 |
| Accent on raised (links, labels) | ~5.0:1 | ~10:1 |
| On-accent text on accent (button) | ~5.9:1 | ~10:1 |

There is no text on top of photographs anywhere, so there's no text-on-photo contrast to check.

## Typography

| Role | Family | Token / class | Use |
|------|--------|---------------|-----|
| Display | Fraunces (variable: opsz, SOFT, WONK) | `--font-display` / `font-display` | Brand, section headlines |
| Text | Source Serif 4 (variable: opsz) | `--font-text` / `font-text` | Body copy, notes (default body font) |
| Mono | Geist Mono | `--font-mono` / `font-mono` | URLs, parameters, catalog numbers, control labels |

`.specimen-label` is the tracked uppercase mono caption (12px, `0.14em` tracking, muted) used for catalog numbers and parameter labels.

Composite text recipes (mirror Figma `typography.*` in the handoff JSON): `.type-section`, `.type-subsection`, `.type-lede`, `.type-lede-hero`, `.type-display-italic`. Hero wordmark stays a local `clamp()` on `HeroPlate`; builder title adds `lg:text-7xl` on top of `.type-section`.

## Spacing

No spacing CSS variables — use Tailwind’s default scale (4px base). Preferred steps: **4, 8, 12, 16, 24, 32, 40, 48, 64** px (`1`–`4`, `6`, `8`, `10`, `12`, `16`).

| Recipe | Class / utilities | Use |
|--------|-------------------|-----|
| Page width + gutters | `.section-shell` (`px-5 sm:px-8`) | Horizontal layout |
| Section vertical rhythm | `.section-block` (`py-16 lg:py-24`) | Major sections |
| Primary button padding | `px-5` (20px) | Documented in Figma `button-padding-inline-primary`; intentional exception on the 4px ladder |

`border-2` on the URL well when copied is emphasis, not part of the scale.

Figma import: [`docs/figma/bug-ipsum-refresh.variables.json`](figma/bug-ipsum-refresh.variables.json). Full handoff: [`docs/figma/bug-ipsum-refresh.tokens.json`](figma/bug-ipsum-refresh.tokens.json).

## Component primitives (in `globals.css`)

Layout: `.section-shell`, `.section-block`. Surfaces: use shadcn `Card` and Tailwind `bg-background` / `bg-card` / `bg-muted` (alias semantics). Controls: shadcn `Button`, `Input`, plus `.lab-range` (slider; `data-off="true"` greys the thumb when an effect is off). Type: `.specimen-label`, `.type-section`, `.type-subsection`, `.type-lede`, `.type-lede-hero`, `.type-display-italic`.

## Motion

| Class | What | Reduced motion |
|-------|------|----------------|
| `.motion-plate-settle` | Hero photo scales 1.05 → 1 and fades up on load (1.2s) | Off |
| `.motion-label-rise` | Hero label column rises 12px on load | Off |
| `.motion-preview` | Builder preview crossfade (opacity, 350ms) | Instant |
| `.motion-lift` | Collection plate image scales to 1.035 on hover/focus | Off |
