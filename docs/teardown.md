# Teardown — patterns for the Contemporary Entomology Lab refresh

Timeboxed pass (Nov 2026). Direction is locked by [frontend-refresh-brief.md](frontend-refresh-brief.md); this document only refines patterns.

**Sources actually reviewed:** [Doodle Ipsum](https://doodleipsum.com/), [Lorem Picsum](https://picsum.photos/), [Placehold.co](https://placehold.co/).
**Comps A and C** (Dribbble "Scientific Web Design", Behance "beetle museum") returned `403` to automated fetch during this pass, so their entries below rely on the brief's characterization (giant type + specimen mindset; colorful insects in a restrained editorial frame). Brandon should eyeball them once against the shipped build.

---

## 1. Patterns to adopt (ranked)

| # | Pattern | Source | Where it lands |
|---|---------|--------|----------------|
| 1 | **Builder at the top, docs below.** Doodle Ipsum puts the customizer first and the URL reference after it. | Doodle Ipsum | Bug Builder sits directly under the hero; lab proofs + reference follow. |
| 2 | **One URL format line, stated once, in mono, early.** Picsum and Placehold both lead with `https://host/{w}/{h}` before anything else. | Picsum, Placehold | Hero quick-start link (`/api/640/480`) and the reference block. |
| 3 | **Every parameter = one heading + one sentence + one working example.** Picsum's rhythm: name, plain sentence, URL. | Picsum | Each lab proof: parameter name, one plain-language note, a series of live plates. |
| 4 | **Show the scale, not just the max.** Picsum documents blur `1–10` with a concrete mid value. | Picsum | Effect proofs show a 3–5 step series on the same specimen so the 1–9 scale is visible. |
| 5 | **State limits plainly.** Placehold lists max/min size in a single line. | Placehold | Reference block lists width/height `1–5000`, image `0–27`, effects `1–9`, tint hex. |
| 6 | **Static vs random explained in one breath.** Doodle Ipsum explains random-by-default and how to pin an image. | Doodle Ipsum | Builder "Random" specimen option + reference note: omit `image` for a random bug. |
| 7 | **Giant expressive brand type as the first-viewport anchor.** | Comp A (per brief) | `Bug Ipsum` set in a large optical-size display serif in the hero label column. |
| 8 | **Specimen photo on a quiet ground, one plate at a time.** | Comp C (per brief) | Single full-bleed hero plate on mount-board/cabinet surfaces; no collage. |
| 9 | **Catalog numbering as wayfinding.** Museum plates are numbered; it doubles as the API index. | Comps A + C | "No. 14" labels map 1:1 to `?image=14` — the label *is* the API value. |
| 10 | **Example images are links to themselves.** Picsum/Placehold example URLs are clickable. | Picsum, Placehold | Every proof plate links to its exact API URL. |

## 2. Patterns considered and rejected

| Pattern | Seen at | Why rejected |
|---------|---------|--------------|
| Flat illustration category tabs (Outline / Abstract / Proportion) | Doodle Ipsum | We have one category — real macro photography. Tabs would be chrome without content. |
| Cache-bust instructions (`?n=1`, `?random=1`) as a prominent section | Doodle Ipsum, Picsum | Useful but niche; folded into a single reference note, not a section. |
| List/metadata endpoints in the main docs | Picsum | Out of scope (no metadata API); captured in `backend-followups.md`. |
| Format matrix (SVG/PNG/WebP/AVIF, retina `@2x`) | Placehold | Our API returns JPEG only; showing a format matrix would advertise features we don't have. |
| Purely typographic, image-light page | Placehold, Picsum | The bugs are the brand; a quiet page would turn Bug Ipsum into a Picsum clone. |

## 3. How Contemporary Entomology Lab shows up

**Layout:** the first viewport is a museum plate — a narrow label column (giant `Bug Ipsum`, one line, one CTA group, a catalog caption) beside a single photograph bleeding to the viewport edge. Below it, the Bug Builder is the lab bench: instruments on one side, the specimen under glass on the other. Proofs read as numbered plate series, the collection as a catalog drawer, About as the closing label. **Type:** Fraunces at high optical size for display, Source Serif 4 for reading, Geist Mono for every URL, parameter and catalog number. **Motion:** three moves only — the hero plate settling in on load, the builder preview crossfading between renders, and a slow lift on collection plates on hover — all removed under `prefers-reduced-motion`. **Playground:** sliders and a specimen drawer, live preview, and a copy button whose success state is the loudest UI moment on the page.

## 4. What came from where

- **Doodle Ipsum:** builder-first ordering; random-vs-pinned explanation; personality allowed in a utility.
- **Lorem Picsum:** the heading → sentence → URL rhythm; showing parameter scales; clickable examples; speed and restraint.
- **Placehold.co:** stating limits in one line; a compact, scannable reference as the final docs layer.
