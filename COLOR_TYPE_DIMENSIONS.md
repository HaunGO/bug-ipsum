# Color, type, and dimensions

Measured from the running frontend. Runtime source of truth: `src/app/globals.css`, `tailwind.config.ts`, `src/app/layout.tsx`, and `src/components/ui/`. The handoff file `docs/figma/bug-ipsum-refresh.tokens.json` matches these numbers except where a row says otherwise.

No new values are introduced here. Tailwind sizes below are the framework defaults this project does not override (`tailwind.config.ts` extends colors, fonts, radius, and `minHeight.11` only).

Breakpoints in use: default, `sm` 640px, `lg` 1024px. `max-w-screen-xl` is 1280px.

---

## Color

Primitives are hex. Semantics point at primitives. Plate is `:root`. Cabinet is `html.dark`, and it only reassigns the semantic tokens. shadcn variables alias the semantics, so `bg-background` and `bg-page` are the same paint.

### Primitives

| Token | Hex |
| --- | --- |
| `--paper-50` | `#f7f7f4` |
| `--paper-100` | `#eeeeea` |
| `--paper-200` | `#e4e4de` |
| `--paper-300` | `#c9cbc4` |
| `--ink-950` | `#0f1110` |
| `--ink-900` | `#181b19` |
| `--ink-700` | `#343935` |
| `--ink-600` | `#4f544f` |
| `--ink-500` | `#858a86` |
| `--ink-400` | `#9da39c` |
| `--ink-100` | `#e9ebe6` |
| `--pin-700` | `#1f6b4f` |
| `--pin-300` | `#7fd1a8` |
| `--destructive` | `#b91c1c` |

`--ink-600` and `--ink-400` are declared and unused by the semantic map. `--destructive` is a shadcn alias only. Its foreground is `--paper-50`.

### Semantics

| Token | Plate | Cabinet | Tailwind names |
| --- | --- | --- | --- |
| `--surface-page` | `#eeeeea` paper-100 | `#0f1110` ink-950 | `bg-page`, `bg-background` |
| `--surface-raised` | `#e4e4de` paper-200 | `#181b19` ink-900 | `bg-raised`, `bg-card`, `bg-secondary`, `bg-popover` |
| `--surface-sunken` | `#f7f7f4` paper-50 | `#0f1110` ink-950 | `bg-sunken`, `bg-muted` |
| `--text-primary` | `#0f1110` ink-950 | `#e9ebe6` ink-100 | `text-ink`, `text-foreground` |
| `--text-muted` | `#343935` ink-700 | `#858a86` ink-500 | `text-muted-foreground` |
| `--line` | `#c9cbc4` paper-300 | `#343935` ink-700 | `border-line`, `border-border`, `border-input` |
| `--accent` | `#1f6b4f` pin-700 | `#7fd1a8` pin-300 | `bg-accent`, `text-accent`, `bg-primary`, `text-primary` |
| `--on-accent` | `#f7f7f4` paper-50 | `#0f1110` ink-950 | `text-on-accent`, `text-primary-foreground`, `text-accent-foreground` |

`--ring` is `--accent`. `--radius` is `--radius-plate`.

`color-scheme`: `light` on plate, `dark` on cabinet.  
Viewport `theme-color`: `#eeeeea` light, `#0f1110` dark.  
`::selection`: background `--accent`, text `--on-accent`.

Accent is the primary button fill, the focus ring, the slider thumb when an effect is on, the URL query, proof syntax, and the copied URL border (`border-primary`). The off-state slider thumb uses `--text-muted`.

Favicon fills `#059669` and `#10B981` are in `public/favicon.svg` only. They are not tokens.

---

## Typography

Loaded in `src/app/layout.tsx` with `display: "swap"`.

| Role | Family | Axes | CSS variable | Tailwind | Fallback |
| --- | --- | --- | --- | --- | --- |
| Display | Fraunces | `opsz`, `SOFT`, `WONK`; normal and italic | `--font-display` | `font-display` | Georgia, serif |
| Text | Source Serif 4 | `opsz` | `--font-text` | `font-text` | Georgia, serif |
| Mono | Geist Mono | — | `--font-mono` | `font-mono` | ui-monospace, monospace |

Body is `font-text`, weight 400, `antialiased`, `font-optical-sizing: auto`. `code`, `kbd`, and `samp` are `font-mono`.  
Geist is loaded as `--font-sans`. Tailwind `font-sans` is mapped to `--font-text`, so the page face is Source Serif 4.

Weights in the UI: 400 everywhere, except primary buttons (`font-medium`, 500) and file-input labels (`file:font-medium`).

Hero wordmark also sets `font-variation-settings: "SOFT" 30, "WONK" 1`. “Ipsum” is `<em>` italic. The rest of the heading is `font-style: normal`.

### Scale in the components

Tailwind’s default size and line-height, then any override the class adds.

| Style | Where | Family | Weight | Size | Line height | Tracking |
| --- | --- | --- | --- | --- | --- | --- |
| Hero wordmark | `HeroPlate` `h1` | Fraunces | 400 | `clamp(80px, 22vw, 128px)`; from `lg`: `clamp(96px, 10.5vw, 168px)` | 0.82 | −0.035em |
| `.type-section` | Section titles | Fraunces | 400 | 48px; `sm` 60px | 1 (48px, then 60px) | −0.025em (`tracking-tight`) |
| Builder title | `BugBuilder` `h2` | Fraunces | 400 | 48 / 60, then `lg` 72px (`text-7xl`) | 1 | −0.025em |
| `.type-subsection` | Proof headings, quick reference | Fraunces | 400 | 30px; `sm` 36px | 36px; `sm` 40px (Tailwind `text-3xl` / `text-4xl`) | 0 |
| `.type-display-italic` | About title | Fraunces italic | 400 | 36px; `sm` 48px | 40px; `sm` 48px | −0.025em |
| Body | `body` | Source Serif 4 | 400 | 16px | 24px | 0 |
| `.type-lede` | Section ledes | Source Serif 4 | 400 | 18px | 1.625 (29.25px) | 0 |
| `.type-lede-hero` | Hero lede | Source Serif 4 | 400 | 18px; `sm` 20px | 1.625 (29.25px, then 32.5px) | 0 |
| Small note | Random-mode note, collection name | Source Serif 4 | 400 | 14px (`text-sm`) | 20px | 0 |
| Collection name hover line | `SpecimenStrip` label | Source Serif 4 | 400 | 14px | `leading-snug` 1.375 (19.25px) | 0 |
| Specimen name in builder | selected label | Fraunces | 400 | 24px (`text-2xl`) | 32px | 0 |
| Footer tagline | `Footer` | Fraunces italic | 400 | 20px (`text-xl`) | 28px | 0 |
| Credit link | About, “Brandon Haun” | Fraunces italic | 400 | 24px | 32px | 0 |
| `.specimen-label` | Kickers, catalog numbers | Geist Mono | 400, uppercase | 12px | 16px | 0.14em |
| Theme toggle label | `ThemeToggle` | Geist Mono | 400, uppercase | 12px | 16px | 0.14em |
| Style-guide contents | `StyleGuideShell` links | Geist Mono | 400, uppercase | 12px | 16px | 0.12em |
| Control / button / input | Button, Input, slider labels | Geist Mono | 400; primary button 500 | 14px | 20px | 0 |
| Button `size="sm"` | defined, unused on the homepage | Geist Mono | 400 | 12px | 16px | 0 |
| URL readout | `CopyUrlField` | Geist Mono | 400 | 16px; `sm` 18px | 1.625 (26px, then 29.25px) | 0 |
| Hint / status | size hint, copy status, plate index | Geist Mono | 400 | 12px | 16px | 0 |
| Proof syntax and caption | `LabProofSection`, `ProofPlate` | Geist Mono | 400 | 14px | 20px | 0 |

Lede color is `--text-muted`. Specimen labels and hints are `--text-muted`. Proof syntax and the URL query are `--accent`.

---

## Dimensions

Base unit is Tailwind’s 4px. Preferred steps recorded in `docs/tokens.md` and `src/lib/styleguide-tokens.ts`: **4, 8, 12, 16, 24, 32, 40, 48, 64**.

| Token | px |
| --- | --- |
| `1` | 4 |
| `2` | 8 |
| `3` | 12 |
| `4` | 16 |
| `6` | 24 |
| `8` | 32 |
| `10` | 40 |
| `12` | 48 |
| `16` | 64 |

`5` is 20px. It is used for primary control padding and page gutters, and it is the one step the token doc calls out as off that ladder.

### Named measures

| Name | Value | Source |
| --- | --- | --- |
| `--radius-plate` / `rounded-plate` / `--radius` | 2px | `globals.css` |
| `rounded-md`, `rounded-sm` | `calc(2px - 1px)` = 1px | `tailwind.config.ts`; unused by homepage components |
| Focus outline, elements that do not cancel it | 2px solid `--accent`, offset 4px | `:focus-visible` in `globals.css` |
| Button and input focus | `outline: none`, then `ring-2` (2px) `--ring`, `ring-offset-2` (8px) on `--background` | `button.tsx`, `input.tsx` |
| Slider focus halo | 3px `--surface-raised` plus 5px `--accent` on the thumb | `.lab-range:focus-visible` |
| Button min height | 44px (`min-h-11`, custom theme key) | `button.tsx`, `tailwind.config.ts` |
| Button gap | 8px (`gap-2`) | `button.tsx` |
| Button padding inline, default size | 20px (`px-5`) | `button.tsx` size `default`, both primary and quiet |
| Button size `sm` | min-height 36px (`min-h-9`), padding inline 12px, type 12px | defined, not used on the homepage |
| Button size `icon` | 44×44px, padding 0 | defined, not used on the homepage |
| Input | min-height 44px, padding 12px inline / 8px block, radius 2px, border 1px | `input.tsx` |
| Quiet / primary border | 1px (`border`) | quiet and input; primary has no border |
| Copied URL well | border 2px | `CopyUrlField` `border-2`; 2px is emphasis, not a spacing step |
| Slider track | height 2px, color `--line` | `.lab-range` |
| Slider thumb | 20×20px, radius 2px, `margin-top: -9px` | `.lab-range` |
| Nav | height 64px (`h-16`), bottom border 1px, `z-50` | `Navigation` |
| Logo | height 36px (`h-9`), width auto | `Navigation` |
| Theme switch track | 24×44px (`h-6 w-11`), radius 2px, border 1px | `ThemeToggle` |
| Theme switch thumb | 16×16px (`h-4 w-4`) | `ThemeToggle` |
| Theme toggle placeholder | 44×88px (`h-11 w-[5.5rem]`) | before mount |
| Skip link | `left` 16px, `top` 16px, padding 16px / 8px, `z-60` | `layout.tsx` |
| Page shell | max-width 1280px, gutter 20px, `sm` gutter 32px | `.section-shell` |
| Section padding | 64px block; `lg` 96px | `.section-block` |
| Hero column, below `lg` | padding 20px inline, 40px top, 32px bottom | `HeroPlate` |
| Hero column, `lg` | padding block 64px, padding-right 48px; padding-left `max(32px, (100vw - 1280px) / 2 + 32px)` | `.hero-label-inset` |
| Hero min height, `lg` | `100svh - 64px` | `HeroPlate` |
| Hero photo, below `lg` | height `52svh`, min 320px | `HeroPlate` |
| Hero grid | 12 columns, text 5, photo 7 | from `lg` |
| Builder grid | 12 columns, controls 5, preview 7, gap 40px / `lg` 48px | `BugBuilder` |
| Builder preview well | height `min(52svh, 420px)`; `lg` `min(70svh, 600px)`; padding 16px, `sm` 24px | `BugBuilder` |
| Preview sticky offset | 96px (`top-24`) | `BugBuilder` |
| Specimen thumbs | 7 columns, gap 8px, image request 96×96 | `BugBuilder` |
| Selected specimen ring | 3px `--ring`, inset | `BugBuilder` |
| Collection grid | 3 columns; `sm` 4; `lg` 7. Gap 8px / 24px; `lg` column gap 12px | `SpecimenStrip` |
| Collection image request | 280×350 | `SpecimenStrip` |
| Proof row gap | 8px; `sm` 12px. Section gap 24px; `lg` 48px | `LabProofSection` |
| Series plate width below `sm` | 38% of the row | `LabProofSection` |
| Card | radius 2px, border 1px, padding when set by the page: About `24px` / `sm` `40px`; quick reference `24px` / `sm` `32px` | `card.tsx`, `AboutPlate`, `LabProofs` |
| Card header primitive | padding 24px, gap 6px (`gap-1.5`) | `CardHeader`; homepage cards do not use this subpart |
| Footer | padding block 32px, gap 8px, top border 1px | `Footer` |
| Copy URL row | padding 12px, `sm` 16px; gap 12px; button min-width 152px (`9.5rem`) | `CopyUrlField` |
| Copy status reset | 2.4s | `CopyUrlField` |
| Color input | 44×56px (`h-11 w-14`), padding 4px | `BugBuilder` tint |

### Motion distances (not spacing tokens)

| Class | Value |
| --- | --- |
| `--ease-settle` | `cubic-bezier(0.2, 0.7, 0.2, 1)` |
| `.motion-plate-settle` | scale 1.05 → 1, opacity 0.35 → 1, 1.2s |
| `.motion-label-rise` | translateY 12px → 0, opacity 0 → 1, 0.8s, delay 0.15s |
| `.motion-preview` | opacity 350ms; developing state is opacity 0.4 |
| `.motion-lift` | image scale 1.035, 0.6s |

`prefers-reduced-motion: reduce` removes those animations and transitions.

---

## Where the handoff JSON disagrees with the components

These are differences already in the repo. The component file is what renders.

| Item | `bug-ipsum-refresh.tokens.json` | Running component |
| --- | --- | --- |
| Quiet button padding inline | 16px (`button-padding-inline-quiet`, described as `px-4`) | 20px. `button.tsx` size `default` is `px-5` for every variant, including `quiet`. |
| Button implementation | Classes `.btn-primary` / `.btn-quiet` in `globals.css`. Those classes are not in `globals.css`. | `src/components/ui/button.tsx` |
| Disabled button | “not defined” | Base variant includes `disabled:opacity-50` and `disabled:pointer-events-none`. |
| Input implementation | Class `.field-input` in `globals.css`. That class is not in `globals.css`. | `src/components/ui/input.tsx`. The 44×12×8 padding numbers match. |
