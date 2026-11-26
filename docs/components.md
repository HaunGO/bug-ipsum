# Component inventory

All homepage UI lives in [`src/components/ui/`](../src/components/ui/). Tokens and shared classes: [tokens.md](tokens.md).

## Page composition

```
layout.tsx      Navigation · <main>{page}</main> · Footer   (+ skip link, theme boot script)
page.tsx        SpecimenProvider
                ├─ HeroPlate          (server)
                ├─ BugBuilder         (client)  #builder
                │   └─ CopyUrlField   (client)
                ├─ LabProofs          (server)  #proofs
                │   └─ LabProofSection → ProofPlate
                ├─ SpecimenStrip      (client)  #collection
                └─ AboutPlate         (server)  #about
```

`page.tsx` calls `connection()` so it renders per request; the hero specimen is random on each load and seeds the builder through `SpecimenProvider`.

## Components

| Component | Type | Purpose | States |
|-----------|------|---------|--------|
| `HeroPlate` | Server | Brand, one supporting line, CTA group, one full-bleed specimen photo (`<picture>` with mobile / tablet / desktop crops) and a catalog caption under the photo. | Load (`motion-plate-settle`, `motion-label-rise`); reduced motion: static. |
| `SpecimenContext` | Client | `SpecimenProvider` + `useSpecimen()`. Holds the selected catalog index, or `null` for random. | — |
| `BugBuilder` | Client | The playground: specimen drawer (radio group), size inputs, effect sliders (0 = off, 1–9), tint picker + hex field, live preview. | Preview: *developing* (dimmed, debounced 250ms) → loaded; error message if the API fails. Inputs: `aria-invalid` + hint for oversize width/height or a bad hex. Random mode note. |
| `CopyUrlField` | Client | URL readout (origin muted / path / query in accent), **Copy URL** and **Open** buttons, polite live region. | idle → **Copied** (border + button turn accent, status text, resets after 2.4s) / **failed** (URL text selected, keyboard-copy hint). |
| `LabProofs` | Server | Section wrapper for the proofs + quick-reference block. | — |
| `LabProofSection` | Server | One parameter: number, name, syntax, plain-language note, plate row. `justified` layout keeps true proportions; `series` is an equal-width step strip (horizontal scroll on mobile). | — |
| `ProofPlate` | Server | One live API image, linked to its exact URL, with mono caption + optional step word. Lazy-loaded. | Hover: caption underline. |
| `SpecimenStrip` | Client | The 28-specimen collection (7×4 on desktop). Selecting one loads it into the builder, scrolls there and focuses that specimen's radio. | Hover/focus: `motion-lift`; reduced motion: none. |
| `AboutPlate` | Server | Closing label plate: personal blurb, Flickr, stack line, credit. | — |
| `Navigation` | Server | Logo (light/dark variants switched by CSS) + `ThemeToggle`. Sticky. | — |
| `ThemeToggle` | Client | `role="switch"` dark-mode toggle. | Placeholder of equal size until mounted. |
| `Footer` | Server | Tagline + photo credit. | — |

## Data / helpers

| Module | Purpose |
|--------|---------|
| `lib/bug-images.ts` | **Single source of truth** for the photo list. Order = `?image=` index (used by the API too). Append only. |
| `lib/specimen-labels.ts` | `filenameToLabel`, `getSpecimenLabel`, `formatPlateNumber` (`No. 07`). |
| `lib/lab-proofs.ts` | Declarative config for every proof plate. |
| `lib/theme.tsx` | Theme state + persistence (unchanged). |

## Removed in the refresh

`ImageGallery` (GSAP auto-scroll), `Header` (stub), `Section`, `CardBox`, `ImageCard`, `UrlExample`, `AnimatedCard`, `DarkModeTest`, `lib/gsap.ts`, `components/index.ts` (unused barrel), and the hidden *Examples* / *Sample URLs* page sections. Dependencies `gsap` and `@tailwindcss/typography` were uninstalled.
