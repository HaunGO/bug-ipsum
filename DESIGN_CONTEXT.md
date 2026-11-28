# Bug Ipsum — design context

Factual snapshot of the shipped frontend on branch `frontend-refresh`. Sources: `src/app/globals.css`, `tailwind.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/components/ui/*`, `src/lib/bug-images.ts`, `src/lib/lab-proofs.ts`, `docs/tokens.md`, `docs/components.md`.

Live product: [bugipsum.com](https://bugipsum.com). Local dev: `npm run dev` → `http://localhost:3001`.

---

## Brand identity

**Name:** Bug Ipsum.  
**What it is:** a URL-based placeholder image service. Images are original macro photographs of insects, spiders, and moths by Brandon Haun.  
**Voice:** playful and personal. Hero, builder, and proofs are utility-first. The collection intro and About are first person.  
**Footer line:** “It’s not a bug… it’s a feature.”  
**Credit:** “Photos © Brandon Haun · bugipsum.com”. About links to Flickr (`flickr.com/photos/haungo`) and `brandonhaun.com`.  
**Stack line in About:** “Next.js · TypeScript · Tailwind · Sharp · 20+ years of tinkerin’”.

**Visual thesis in the current UI:** photographs carry the color. The interface is a cool neutral frame with one green accent. Light theme is called **plate** (mount board). Dark theme is called **cabinet** (green-black specimen cabinet).

**Wordmark (hero, not the nav logo):** Fraunces, weight 400, “Bug” over italic “Ipsum”. Variation axes on the heading: `"SOFT" 30, "WONK" 1`. Tracking `-0.035em`, line-height `0.82`.

**Nav mark:** raster logos `/images/logo-black.png` (light) and `/images/logo-white.png` (dark), rendered at `h-9` (`36px`), width auto. Both are in the DOM; CSS shows one.  
**Favicon:** `/favicon.svg`, a simple bug drawn in `#059669` and `#10B981`. Those hexes are the icon only; they are not theme tokens.

There is no text on top of photographs. Captions sit under the image.

---

## Color

Two tiers. Primitives are raw values. Components use semantic tokens. Plate values live on `:root`. Cabinet reassigns semantics under `html.dark`. shadcn variables alias the semantics.

### Primitives

| Token | Hex | Role |
| --- | --- | --- |
| `--paper-50` | `#f7f7f4` | Sunken wells (plate) |
| `--paper-100` | `#eeeeea` | Page (plate) |
| `--paper-200` | `#e4e4de` | Raised panels (plate) |
| `--paper-300` | `#c9cbc4` | Rules (plate) |
| `--ink-950` | `#0f1110` | Page (cabinet); primary text (plate) |
| `--ink-900` | `#181b19` | Raised panels (cabinet) |
| `--ink-700` | `#343935` | Rules (cabinet); muted text (plate) |
| `--ink-600` | `#4f544f` | Defined; not a current semantic |
| `--ink-500` | `#858a86` | Muted text (cabinet) |
| `--ink-400` | `#9da39c` | Defined; not a current semantic |
| `--ink-100` | `#e9ebe6` | Primary text (cabinet) |
| `--pin-700` | `#1f6b4f` | Accent (plate) — specimen-pin green |
| `--pin-300` | `#7fd1a8` | Accent (cabinet) |
| `--destructive` | `#b91c1c` | shadcn destructive; not used on the homepage |

### Semantics

| Token | Plate | Cabinet | Tailwind |
| --- | --- | --- | --- |
| `--surface-page` | paper-100 | ink-950 | `bg-page`, also `bg-background` |
| `--surface-raised` | paper-200 | ink-900 | `bg-raised`, also `bg-card` |
| `--surface-sunken` | paper-50 | ink-950 | `bg-sunken`, also `bg-muted` |
| `--text-primary` | ink-950 | ink-100 | `text-ink`, also `text-foreground` |
| `--text-muted` | ink-700 | ink-500 | `text-muted-foreground` |
| `--line` | paper-300 | ink-700 | `border-line`, also `border-border` / `border-input` |
| `--accent` | pin-700 | pin-300 | `bg-accent` / `text-accent`, also `bg-primary` / `text-primary` |
| `--on-accent` | paper-50 | ink-950 | `text-on-accent`, also `text-primary-foreground` |

`--ring` equals `--accent`. `--radius` equals `--radius-plate` (`2px`).  
`color-scheme` is `light` on `:root` and `dark` on `html.dark`.  
Viewport `theme-color`: `#eeeeea` (light), `#0f1110` (dark).  
Selection: background `--accent`, text `--on-accent`.

Accent is used for the primary button, focus rings, slider thumbs (when an effect is on), query strings in the URL field, proof syntax, and the copied URL border.

### Documented contrast (from `docs/tokens.md`)

| Pair | Plate | Cabinet |
| --- | --- | --- |
| Primary text on page | ~16:1 | ~15:1 |
| Muted text on raised | ~9.2:1 | ~5.4:1 |
| Accent on raised | ~5.0:1 | ~10:1 |
| On-accent text on accent | ~5.9:1 | ~10:1 |

---

## Typography

Loaded in `src/app/layout.tsx` via `next/font/google`, `display: "swap"`.

| Role | Family | CSS variable | Tailwind | Fallback |
| --- | --- | --- | --- | --- |
| Display | Fraunces, axes `opsz`, `SOFT`, `WONK`, normal + italic | `--font-display` | `font-display` | Georgia, serif |
| Text | Source Serif 4, axis `opsz` | `--font-text` | `font-text` | Georgia, serif |
| Mono | Geist Mono | `--font-mono` | `font-mono` | ui-monospace, monospace |

Body default: `font-text`, `antialiased`, `font-optical-sizing: auto`. `code`, `kbd`, and `samp` use `font-mono`.  
Geist is also loaded as `--font-sans`. Tailwind `font-sans` is mapped to `--font-text`, so the page face is Source Serif 4.

Weights in use: 400 for display and body. Primary buttons use `font-medium` (500) on the mono label.

### Composite classes (`globals.css`)

| Class | Specification |
| --- | --- |
| Hero `h1` (local, not a utility) | `clamp(5rem, 22vw, 8rem)`; at `lg`: `clamp(6rem, 10.5vw, 10.5rem)`. Leading `0.82`. Tracking `-0.035em`. |
| `.type-section` | Fraunces 400, `text-5xl` (48px / line-height 1), `sm:text-6xl` (60px). `tracking-tight` (`-0.025em`). Builder title adds `lg:text-7xl` (72px). |
| `.type-subsection` | Fraunces 400, `text-3xl` (30px), `sm:text-4xl` (36px). |
| `.type-display-italic` | Fraunces 400 italic, `text-4xl`, `sm:text-5xl` (48px), `tracking-tight`. |
| `.type-lede` | Source Serif, `text-lg` (18px), `leading-relaxed` (1.625), muted. |
| `.type-lede-hero` | Same, plus `sm:text-xl` (20px). |
| `.specimen-label` | Geist Mono, `text-xs` (12px), uppercase, tracking `0.14em`, muted. |
| Control labels | Geist Mono `text-sm` (14px). |
| Generated URL | Geist Mono `text-base` (16px), `sm:text-lg` (18px), `leading-relaxed`. |

Catalog numbers: `No. 00`–`No. 27` via `formatPlateNumber`. Labels are filename-derived (`jumping-spider.jpg` → “Jumping spider”; Flickr suffixes like `_27937308242_o` are stripped).

---

## Spacing, radius, focus

No spacing CSS variables. Tailwind’s 4px scale. Preferred steps: 4, 8, 12, 16, 24, 32, 40, 48, 64px (`1`–`4`, `6`, `8`, `10`, `12`, `16`).

| Recipe | Value |
| --- | --- |
| `.section-shell` | `mx-auto w-full max-w-screen-xl` (1280px) + `px-5` (20px), `sm:px-8` (32px) |
| `.section-block` | `py-16` (64px), `lg:py-24` (96px) |
| Nav bar | `h-16` (64px), sticky, `border-b`, `z-50` |
| `--radius-plate` | `2px` (`rounded-plate`) |
| Primary button padding | `px-5` (20px), `min-h-11` (44px), `gap-2` (8px) |
| Quiet button padding | same height and gap; horizontal padding follows the default size (`px-5`) |
| Focus | `2px solid var(--accent)`, offset `4px` |
| Slider track | 2px, color `--line`. Thumb 20×20px, radius 2px |
| Copied URL well | `border-2` (emphasis, not part of the 4px ladder) |

Hero text column at `lg`: `padding-inline-start: max(2rem, calc((100vw - 1280px) / 2 + 2rem))` so the wordmark aligns with `.section-shell` while the photo runs to the right edge.

---

## Breakpoints

`tailwind.config.ts` does not override `screens`. Tailwind 3 defaults apply:

| Name | Min width | Where the homepage uses it |
| --- | --- | --- |
| (default) | 0 | Single column. Hero image `52svh`, min height `320px`. Collection 3 columns. |
| `sm` | 640px | Gutters 32px. Hero image source `/api/1200/800`. Lede 20px. Collection 4 columns. URL field becomes a row. |
| `md` | 768px | Defined by Tailwind; homepage layout does not key off `md`. |
| `lg` | 1024px | Hero is a 12-column grid, `min-h: calc(100svh - 4rem)`, text 5 / photo 7. Hero image source `/api/1400/1300`. Section padding 96px. Builder is 5 + 7 columns, preview sticky. Collection 7 columns. |
| `xl` | 1280px | `max-w-screen-xl`. Style-guide sidebar uses `xl`; homepage content does not. |
| `2xl` | 1536px | Framework default; unused by homepage layout. |

---

## Motion

Easing: `--ease-settle: cubic-bezier(0.2, 0.7, 0.2, 1)`. `scroll-behavior: smooth` on `html`.

| Class | Behavior |
| --- | --- |
| `.motion-plate-settle` | Hero photo: opacity 0.35 and scale 1.05 → 1, 1.2s |
| `.motion-label-rise` | Hero text column: opacity 0, translateY 12px → 0, 0.8s, delay 0.15s |
| `.motion-preview` | Builder preview opacity, 350ms. Dimmed (`opacity-40`) while the next image loads |
| `.motion-lift` | Collection image scale 1.035 on hover or focus, 0.6s |

`prefers-reduced-motion: reduce` turns those animations and transitions off, sets scroll behavior to `auto`, and disables the theme-toggle thumb transition (`motion-reduce:transition-none`).

---

## Theme behavior

Class strategy: `darkMode: ['class']`. `html` gets `dark` or `light`.  
An inline script in `<head>` reads `localStorage.theme` (`dark`, `light`, or `system` / unset) and applies the class before paint.  
`ThemeToggle` is a `role="switch"` labeled “Dark”. Until mounted it renders an empty `h-11 w-[5.5rem]` placeholder. The switch track is `h-6 w-11`, radius 2px, border `--line`, well `--muted`; the thumb is `h-4 w-4` in `--primary`.

---

## Component inventory

shadcn/ui primitives in `src/components/ui/`, themed with the tokens above. Homepage composition is in `src/app/page.tsx`.

### Primitives

**Button** (`button.tsx`). Base: inline flex, `min-h-11`, `gap-2`, `rounded-plate`, `font-mono text-sm`.  
Variants: `default` (primary fill, medium weight, hover opacity 0.9), `quiet` (transparent, 1px border, hover border becomes foreground), `outline`, `ghost`, `link`.  
Sizes: `default` (`px-5`), `sm` (`min-h-9 px-3 text-xs`), `icon` (`size-11`).  
Homepage uses `default` and `quiet` only. `asChild` via Radix Slot.

**Input** (`input.tsx`). `min-h-11`, `rounded-plate`, 1px border, `bg-muted`, mono 14px, padding `px-3 py-2`. Focus ring 2px, offset 2px.

**Card** (`card.tsx`). `rounded-plate`, 1px border, `bg-card`. Subparts: `CardHeader`, `CardTitle` (Fraunces, `text-lg`), `CardDescription`, `CardContent`, `CardFooter`. Homepage uses `Card` on the quick-reference block and About. Proofs and the collection are bare plates, not cards.

**Slider** (not a component). Native `input[type=range]` with class `.lab-range`. `data-off="true"` greys the thumb when the value is 0.

### Chrome

| Component | What it renders |
| --- | --- |
| `Navigation` | Sticky bar. Logo link home. `ThemeToggle` on the right. |
| `Footer` | Top rule. Italic Fraunces tagline. Mono credit, `text-xs`, muted. |
| Skip link | “Skip to the Bug Builder”, visually hidden until focus, fixed top-left, primary fill. |

### Homepage sections, in order

1. **`HeroPlate`** (`#` none). Server component.  
   - Left: kicker-less wordmark, lede “A buggy little placeholder image service: real bugs from my own macro photography, sized and styled by URL.”, primary link “Build a URL with this bug ↓” to `#builder`, quiet text link “or just use /api/640/480”.  
   - Right: one specimen, `object-cover`, no overlay. Caption under the photo: `No. NN · {label}` and `?image={index}`.  
   - Image index is random per request (`page.tsx` calls `connection()`). Sources: `/api/900/760` (default), `/api/1200/800` from 640px, `/api/1400/1300` from 1024px.

2. **`BugBuilder`** (`#builder`, `scroll-mt-16`). Client. Surface `bg-card`.  
   - Kicker “01 — The bench”. Title “Bug Builder”. Lede: “Pick a specimen, set the size and effects, copy the URL. The preview is the real image your URL returns.”  
   - `CopyUrlField` first.  
   - Preview (right on `lg`, sticky `top-24`): sunken well, max height `min(52svh, 420px)` / `min(70svh, 600px)` at `lg`. Status “Developing…” or “Scaled to fit”.  
   - Controls (left on `lg`): specimen radios (7-column thumb grid, 96×96), size number inputs (default 640×480, max 5000), sliders saturation / blur / contrast (0–9, 0 = param omitted), tint color input + hex field (default swatch `#4ecdc4` when empty; URL writes 6-digit hex without `#`).  
   - “Random bug” clears `image`. Random mode note: “Random mode: every load of this URL returns a different bug.”  
   - Preview requests debounce 250ms. The copy URL updates immediately. Origin is `https://bugipsum.com` on the server, then `window.location.origin`.

3. **`LabProofs`** (`#proofs`). Server. Page surface.  
   - Kicker “02 — Lab proofs”. Title “Every parameter, proven”.  
   - Five groups: Dimensions (justified row, true aspect ratios), Saturation, Blur, Contrast, Tint (equal-width series; horizontal snap scroll below `sm`). Series plates are 360×450. Steps shown: 1, 3, 5, 7, 9. Tints: `ff6b6b`, `ffd93d`, `51cf66`, `4ecdc4`, `ae3ec9`.  
   - Each plate is a live `/api/...` image linking to that URL. Caption is the path or query, mono 14px; optional step word under it.  
   - Closing `Card`: “Quick reference” parameter list plus one combined example URL.

4. **`SpecimenStrip`** (`#collection`). Client. Surface `bg-card`.  
   - Kicker “03 — The collection”. Title “{n} specimens” (currently 28). Lede: “All photographed by me, mostly in my own backyard. Pick one to load it into the Bug Builder.”  
   - Grid `grid-cols-3 sm:grid-cols-4 lg:grid-cols-7`, gap `gap-x-2 gap-y-6` (`lg:gap-x-3`). Each cell is a button: image `/api/280/350?image={index}`, plate number, filename label. Click sets the builder specimen, scrolls to `#builder`, and focuses that radio.

5. **`AboutPlate`** (`#about`). Server. `Card` with padding `p-6 sm:p-10`.  
   - Kicker “04 — About”. Italic title “What is the meaning of this?”. Personal copy, Flickr link, stack line, “Brandon Haun”.

`SpecimenProvider` wraps the page. The builder starts on the hero’s index.

### Copy URL states

`CopyUrlField`: idle → **Copied** (well border and nothing else turn `border-primary`; button label becomes a check + “Copied”; status text; resets after 2.4s) or **failed** (URL text selected; “Clipboard is blocked here — the URL is selected, press Ctrl/⌘ + C.”). Status is a polite live region.

---

## Homepage functionality (API the UI teaches)

Contract the page builds and documents. JPEG output. Crop-to-fill, not stretch.

```
GET /api
GET /api/{width}/{height}
  ?image={0–27}
  &saturation={1–9}
  &blur={1–9}
  &contrast={1–9}
  &tint={hex}
```

- `/api` alone is documented as a random bug at 300×300.  
- Width and height: 1–5000. Out-of-range builder input shows “Capped at 5000px per side.” and the URL keeps the last valid value.  
- `image` omitted: random specimen on every request. Index order is `bugImages` in `src/lib/bug-images.ts` (28 files under `public/images/bugs/only/`).  
- Effect `0` in the builder omits the parameter. Documented scale: 5 is natural for saturation and contrast; 1 is the low end; 9 is the high end.  
- Tint in the URL is 6-digit hex, no `#`.

The builder, proofs, and collection all request these same endpoints. Changing the array order would change which photo `?image=N` returns.
