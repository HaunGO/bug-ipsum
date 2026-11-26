# Bug Ipsum Frontend Refresh Brief

**Project:** bugipsum.com  
**Repo:** HaunGO/bug-ipsum  
**Date:** Nov 19, 2026  
**Owner:** Brandon Haun  
**Status:** Draft v3.1 — direction + hero/playground IA locked; a few soft items remain

---

## Mission

Refresh the Bug Ipsum marketing/docs frontend so the site feels as distinctive as the product: a personal placeholder image service powered by original insect photography. The API and image-processing backend stay as they are. This is a deliberate frontend craft pass — not a rewrite of the service.

**The one question the site should answer in under five seconds:**

> How do I get a bug placeholder image URL that fits my layout?

Everything on the page serves that: show the collection, make building a URL effortless, prove every parameter with live examples, and leave people with a link they can paste into a project.

**Creative north star (locked):** *Contemporary Entomology Lab* — the elegance of a natural history museum crossed with the personality of an experimental creative developer’s site. Memorable and art-directed, still exceptionally fast and useful.

**IA locks (v3):**
- **Hero:** single iconic specimen plate; different image on each refresh/load
- **Playground:** immediately under the hero (not competing inside the first-viewport art)
- **Specimen labels:** filename-derived for now (humanized names later if desired)

This brief is the input for a later Plan Mode session. We will iterate until it is sharp enough to one-shot the refresh.

---

## What this project is

Bug Ipsum is a live Next.js service at [bugipsum.com](https://bugipsum.com):

- **Product:** URL-based placeholder images of real bugs (insects, spiders, moths, etc.) photographed by Brandon
- **API (keep intact):** `/api/{width}/{height}` with optional `image`, `saturation`, `blur`, `contrast`, `tint`
- **Collection:** ~28 original photos in `public/images/bugs/only/`
- **Stack today:** Next.js 15 App Router, React 19, TypeScript, Tailwind, GSAP, Sharp, Vercel, dark mode
- **Voice:** playful, personal, slightly irreverent — “It’s not a bug… It’s a feature.”

The backend is considered solid for now. Backend/API enhancements may follow after the frontend refresh; they are out of scope for this pass unless a tiny surface-level fix is required to support the new UI.

---

## Locked creative direction

### Name

**Contemporary Entomology Lab**

### Formula

**Editorial Entomology (A)** + **Contemporary Specimen Gallery (C)** + **playground-first UX**

| Layer | Role |
|-------|------|
| A — Editorial entomology | Giant typography, scientific specimen attitude, museum-style art direction |
| C — Contemporary specimen gallery | Dramatic, colorful insect photography against a restrained editorial layout |
| Playground-first UX | Interactive builder first: immediate visual results, one-click copy, developer-friendly API presentation secondary |

### Goal

A memorable, art-directed experience that is still exceptionally fast and useful. The playground is prominent and beautifully designed. API documentation supports it — it does not lead.

### What this means in practice

- Large, expressive typography
- Spectacular macro insect photography as the dominant visual material — **one iconic hero plate per load**
- Specimen labeling via **filenames** for now (“plate” language welcome; no humanized taxonomy pass yet)
- Subtle interactive movement and hover where it earns its place (presence, not carnival) — not a multi-bug auto-scroll hero
- A first-class image-generation playground (Bug Builder) **directly under the hero**
- One-click URL copying as a primary success moment
- API teaching lives below / beside the playground, not as a wall of docs

### Rejected or deprioritized directions

| Direction | Verdict | Why |
|-----------|---------|-----|
| B — Immersive insect world (cinematic / mysterious museum site) | Reference only | Lighting and premium photo storytelling can inform mood; do not build a heavy cinematic narrative site that slows the URL job |
| D — Playful maximalism (oversized shapes, loud graphic personality) | Reject as primary | Personality yes; maximalist noise no. Conflicts with restrained editorial gallery and utility speed |
| Generic SaaS / AI landing patterns | Reject | Wrong category entirely |
| Pure minimal Picsum clone | Reject as art direction | Keep Picsum’s clarity; do not copy its visual quietness as the brand |

### Visual references (concepts — not verified award winners)

Use these to calibrate tone during teardown and design lock:

1. **A — Editorial entomology:** [Scientific Web Design (Dribbble)](https://dribbble.com/shots/26294440-Scientific-Web-Design) — giant type, specimen mindset
2. **B — Immersive insect world (mood only):** [Insecta — Entomology Museum Website](https://dprofile.ru/case/176840/insecta-entomology-museum-website) — cinematic macro, mysterious light
3. **C — Contemporary specimen gallery:** [beetle museum (Behance)](https://www.behance.net/gallery/155264013/beetle-museum) — colorful insects, restrained editorial frame
4. **D — Playful maximalism (anti-pattern for primary UI):** [Beetle Land / similar maximal bug sites](https://prtimes.jp/main/html/rd/p/000000208.000025847.html) — study for energy, do not adopt as layout system

---

## Scope of this refresh

### In scope

- Homepage information architecture and visual system under *Contemporary Entomology Lab*
- Brand presence in the first viewport
- Hero / gallery treatment of the photo collection
- Bug Builder as the prominent playground (immediate preview, clear controls, one-click copy)
- Specimen-minded image picking / labeling in the builder and gallery where it helps
- Parameter demo sections reframed as lab plates / live proofs, not a docs dump
- Copy hierarchy, typography, color, motion
- Light/dark theme polish that feels intentional, not bolted on
- Mobile and desktop composition
- Accessibility and performance of the **frontend shell** (not re-architecting Sharp/caching)
- Component cleanup where the current UI is incomplete, redundant, or fighting itself
- A short teardown against the comps and libraries below (direction is locked; teardown refines patterns, not the thesis)

### Out of scope (for this pass)

- New API parameters, formats, or endpoints
- Auth, accounts, databases
- Changing caching strategy or Sharp pipelines (unless a UI bug forces a tiny fix)
- Adding dozens of new photos (gallery may showcase the existing set better; new assets are optional stretch)
- CMS, blog, or multi-page marketing site expansion
- Rewriting away from Next.js / Tailwind / Vercel
- Public launch campaigns, social posts, or third-party outreach
- Building a full “museum narrative” experience (direction B as a product)

### Explicit non-goals

- Do not turn the homepage into a dashboard of metrics, cards-for-cards’-sake, or a generic SaaS landing template
- Do not hide the photography behind chrome — the bugs are the brand
- Do not break existing API URLs; consumers depend on the current contract
- Do not ship half-finished “examples” / “sample URLs” sections that are still `hidden` in code without deciding keep, redesign, or delete
- Do not let specimen theater slow down copy-a-URL

---

## Current state (honest audit)

Use this as the baseline the refresh improves on — not as sacred layout.

| Area | Today | Problem / opportunity |
|------|--------|------------------------|
| Brand in first viewport | Logo in nav; header title component is effectively empty; subtitle lives loosely as page copy | Brand should be hero-level, museum-display energy + product clarity |
| Gallery / hero | Full-bleed horizontal GSAP auto-scroll of many bugs | Replace hero with **single iconic plate** (random per refresh); demote multi-image strip if kept at all |
| Bug Builder | Functional form + live preview + copy URL | Must rise to playground-grade: immediate, beautiful, copy-success obvious |
| Parameter demos | Stacked sections with ImageCards for size / saturation / blur / contrast / tint | Reframe as lab proofs; kill repetitive card sludge |
| Typography | Geist + Geist Mono + Mochiy Pop One | Replace or ruthlessly edit into an expressive editorial pairing + mono for URLs |
| Theme | Class-based dark mode + ThemeToggle | Keep; make tokens feel like lab surfaces (light plate / dark cabinet) |
| Components | Header/Section/CardBox/ImageCard/etc. | Uneven completeness; Header is a stub; dead imports and empty whitespace in `page.tsx` |
| About | Short personal blurb + stack line + brandonhaun.com | Keep the voice; integrate as a closing label plate, not an afterthought |

**Preserve:** API contract, photo ownership/story, playful-personal tone, Bug Builder as primary interactive tool, dark mode, Vercel deployment path.

**Improve or redesign:** first-viewport composition, section rhythm, demo presentation, typography/color system, motion discipline, specimen labeling, mobile layout, component inventory consistency.

---

## The core user journeys

### 1. Developer drops in for a URL (primary)

1. Lands on site  
2. Sees what Bug Ipsum is and that the images are real/original  
3. Uses Bug Builder (or a clear quick-start URL)  
4. Copies a URL and leaves  

### 2. Designer / curious visitor browses the bugs

1. Lands on site  
2. Explores the specimen gallery / collection  
3. Optionally opens Bug Builder with a chosen image  
4. May share or bookmark the site  

### 3. Returning user tweaks effects

1. Lands or scrolls to the playground  
2. Adjusts saturation / blur / contrast / tint  
3. Confirms with live preview  
4. Copies updated URL  

Every major UI decision should make journey 1 faster without killing the delight of journey 2. Art direction never blocks the copy button.

---

## Phase 1: Steal from the best (teardown)

Direction is locked. Teardown is for **patterns**, not for rediscovering the thesis. Timebox ~1 hour, write `docs/teardown.md`, then build.

### Direct competitors and related tools

For each: one thing it does best, one interaction worth borrowing, one thing that makes you bounce.

| Site | Why it matters | Borrow | Avoid |
|------|----------------|--------|-------|
| [Doodle Ipsum](https://doodleipsum.com/) | Closest conceptual comparison — playful illustrations, friendly branding, visual examples, copyable URLs | Approachable docs-as-play; personality without apology; playground-adjacent clarity | Illustration-only vibe that underplays real photography |
| [Lorem Picsum](https://picsum.photos/) | Minimal interface, clear explanations, image-first, fast | Clarity, speed, image-led teaching | Visual blandness; zero brand theater |
| [Placehold.co](https://placehold.co/) | Straightforward API docs + visual examples | Baseline clarity for parameter explanation | Pure utility beige — not the artistic target |
| [unDraw](https://undraw.co/) (related) | Open illustration library positioning / browse patterns | Optional: browse/select calmness | Flat illustration language (we have real macros) |

Also skim only as needed: Unsplash (real photos as placeholders), Cloudinary/imgix marketing (URL-as-API teaching patterns — never enterprise chrome).

### Visual direction comps (already shortlisted above)

Study A + C deeply. Sample B for lighting/atmosphere only. Use D as a cautionary maximalism check.

### Award / craft libraries (browse, don’t binge)

Pull specific patterns: typography pairings, photo-to-UI framing, motion choreography, playground interactions.

- [Awwwards — Experimental](https://www.awwwards.com/websites/experimental/)
- [Awwwards — Animation](https://www.awwwards.com/websites/animation/)
- [Awwwards — Interaction Design](https://www.awwwards.com/websites/interaction-design/)
- [Recent](https://www.recent.design/)
- [SiteInspire](https://www.siteinspire.com/) — refined editorial / minimalist

### Output (`docs/teardown.md`)

1. Ranked list of **8–10 patterns to adopt** and where each came from  
2. **5 patterns considered and rejected** (with why)  
3. One-paragraph confirmation of how *Contemporary Entomology Lab* shows up in layout, type, motion, and playground  
4. Explicit note of what was taken from Doodle Ipsum vs Picsum vs Placehold.co  

---

## Phase 2: What the refreshed site must do

### v1 — must ship

**First viewport (one composition)**

- Brand (**Bug Ipsum**) as a hero-level signal — large expressive type, not only nav text  
- One short supporting line that states the product  
- One clear CTA that leads to the playground directly under the hero (scroll/anchor is fine)  
- **Single iconic specimen plate** as the dominant visual — full-bleed / edge-to-edge, not a collage, not a motion strip of many bugs  
- **Different hero image on each page refresh/load** (random from the collection, stable for that visit)  
- Optional light filename / plate caption on the hero — keep subordinate to brand + photo  
- No stats strips, feature-card grids, floating badges, or promo chips in the hero  

**Playground — Bug Builder (primary product UI, under hero)**

- Sits **immediately under the hero** as the first major interactive section  
- Immediate visual results, beautiful controls, obvious copy success  
- Live preview updates as parameters change  
- One-click copy with clear success feedback (not only `console.log`)  
- Image picker that feels like choosing a specimen  
- **Labels = filename-derived for now** (e.g. `jumping-spider.jpg` → readable filename text); no humanized common-name pass in v1  
- URL stays readable and trustworthy  
- API reference is secondary to this surface  

**Collection / further specimens**

- Additional photography can appear later on the page as editorial plates or a quieter strip — **not** as the hero  
- Subtle hover / motion that suggests life without chaos  
- Respect `prefers-reduced-motion`; manual exploration always works  

**Lab proofs (API teaching)**

- Dimensions and each effect demonstrated with live images  
- Plain-language parameter notes beside working examples  
- Visual rhythm like specimen plates, not identical SaaS cards  
- Decide fate of currently-hidden Examples / Sample URLs: redesign into proofs, fold useful combos into stretch presets later, or delete  

**Chrome**

- Nav: brand + theme toggle (keep lean)  
- Footer: keep the voice (“It’s not a bug…”) and personal credit  
- About: short, personal, non-corporate — a closing plate  

**Quality gates**

- Works on mobile and desktop as one coherent composition system  
- Keyboard operable; visible focus; sensible contrast in light and dark  
- No broken images, stub headers, or dead UI  
- Existing API URLs continue to work unchanged  
- Feels art-directed **and** gets a URL copied fast  

### What “presets” means (glossary)

**Presets** = named one-click recipes in the playground that apply a bundle of parameters at once — e.g. a button labeled “Vintage specimen” that sets something like `tint=8b4513&contrast=3&blur=2&saturation=3`, or “Neon bug” with a cyan tint + high saturation.

They are **not** required to ship the refresh. The site already has hidden “bug-themed style” URL examples in code; presets would just make those clickable inside Bug Builder.

**Decision for this pass:** presets are **stretch only** — build them only after the hero, playground, proofs, and craft bar are solid. v1 ships with manual controls + live preview + copy.

### Stretch — only after v1 is polished

- Named effect presets as one-click playground states (see glossary above)  
- Shareable builder state via URL query  
- Humanized specimen names / light scientific flavor text (beyond filenames)  
- Refined logo / wordmark treatment if the type system demands it  
- Optional compact API reference page — default remains a powerful single page  

### Explicitly later (post-refresh backend ideas — do not build now)

- New image formats, more parameters, metadata API, random-with-seed, etc.  
- Larger photo library expansion workflow  
- Analytics-driven UX experiments  

Capture ideas in `docs/backend-followups.md` instead of implementing them.

---

## Phase 3: Design and craft bar

### Direction (locked)

**Contemporary Entomology Lab** — editorial photography tool + specimen gallery, not SaaS dashboard, not maximalist bug carnival, not cinematic museum film.

Macro insect photos do the loud visual work. Type is large and expressive. UI is restrained, precise, slightly playful. Scientific labeling is a motif used with restraint.

### Composition rules (non-negotiable)

- **One composition** in the first viewport — not a dashboard  
- **Brand first** — removing the nav should not make the page look like a generic placeholder service  
- **Hero budget** — brand, one line, one CTA group, one dominant image plane  
- **No hero overlays** — no floating badges, stickers, or chips on the photos  
- **Cards only when they carry interaction** — decorative card chrome is a last resort  
- **One job per section** — one purpose, one headline, usually one short supporting sentence  
- **Playground > docs** — if something competes with Bug Builder for attention, it loses  

### Typography

- Large, expressive display face + readable text face + mono for URLs/parameters  
- No Inter / Roboto / Arial / default system-as-brand  
- Re-evaluate Geist + Mochiy: keep only if they earn a place in the lab thesis; default expectation is a tighter editorial pairing  
- Specimen labels can use small caps / tracked mono / caption styles — keep them legible  

### Color and surfaces

- Define CSS variables: primitive + semantic tiers, light and dark  
- Think **light plate / dark cabinet** more than “generic gray theme toggle”  
- Avoid AI-landing clusters: purple-on-white / purple-indigo gradients; warm cream + terracotta serif template; broadsheet hairline newspaper layouts  
- Avoid: heavy glow, pill spam, multi-layer shadows, emoji-as-structure, maximalist shape explosions (direction D)  
- Let photo color lead; UI frames  

### Motion

- Ship **2–3 intentional motions** (e.g. hero plate presence, playground preview transitions, restrained hover on later specimen plates)  
- Subtle bug life ≠ constant wiggle on every element  
- Honor `prefers-reduced-motion` with a complete reduced path  
- Current GSAP multi-image auto-scroll gallery is **not** the hero anymore; retire or demote it. If motion remains elsewhere, it must earn its place under A+C  

### Tokens and components

- Real token layer in CSS custom properties (`docs/tokens.md`)  
- Component inventory with states (`docs/components.md`)  
- Clean up stubs and dead code as part of the refresh  

### Accessibility

- WCAG 2.2 AA as a release gate for the site UI  
- Visible focus everywhere  
- Contrast checked on any text-on-photo treatments  
- Builder controls fully labeled; copy success announced  
- Touch targets usable on mobile  

### Performance budget (frontend)

- Art direction must not cost the “exceptionally fast” half of the goal  
- Homepage feels instant on a typical laptop; acceptable on mid mobile  
- Lazy-load below-fold proofs where helpful  
- Do not regress API image performance  
- Fix obvious layout shift around gallery and playground preview  

---

## Phase 4: Build constraints

### Stack (keep)

- Next.js App Router + TypeScript + Tailwind + existing Sharp API routes  
- GSAP only if motion needs still justify it after the craft pass  
- Deploy on Vercel as today (`bugipsum.com`)  

### Do not

- Introduce a new CSS framework or heavy UI kit “for speed”  
- Add auth, CMS, or state libraries unless truly required for builder URL state (prefer URL + React state)  
- Commit secrets or change Analytics IDs carelessly  
- Break `/api/...` response shapes or caching semantics  

### Repo hygiene during the refresh

- Prefer a readable commit sequence when implementing — but **do not commit unless asked** during brief iteration  
- Document locked choices in `docs/decisions.md`  
- Keep the brief updated if scope shifts; do not silently expand  

---

## Working agreement

**Pre-approved during implementation (later):**

- Edit frontend components, styles, tokens, copy, and homepage structure  
- Remove dead code / hidden unfinished sections after deciding their fate  
- Add docs under `/docs` for teardown, tokens, components, decisions  
- Run local lint/build and fix issues introduced by the refresh  

**Ask first:**

- Anything that changes the public API contract  
- Paid services, new accounts, or DNS changes  
- Large photo library additions or watermarking changes  
- Rebranding away from “Bug Ipsum” / domain assumptions  

**Never:**

- Delete the photo collection or rewrite provenance  
- Post publicly or message third parties on Brandon’s behalf  
- Force-push or destructive git operations without explicit request  

---

## Definition of done

The refresh is done when:

1. **bugipsum.com** (or production-ready build) presents a *Contemporary Entomology Lab* homepage that answers “how do I get a bug image URL?” in seconds  
2. Bug Builder meets the playground bar: preview, specimen choice, parameters, one-click copy feedback  
3. API teaching is intentional and secondary — no abandoned `hidden` demos left half-alive  
4. Light and dark themes both feel designed (plate / cabinet)  
5. Mobile and desktop read as the same product  
6. `prefers-reduced-motion` is respected  
7. axe-critical issues on the homepage are cleared; keyboard path works through playground and primary links  
8. API endpoints still behave as before for existing URLs  
9. Docs exist: teardown, tokens, components, decisions (and backend-followups if needed)  
10. Post-ship note lists known gaps and the next ten improvements, ranked  

---

## What the Plan Mode session should produce

When this brief is locked, Plan Mode should return:

1. Concrete IA / section order for the homepage (playground placement explicit)  
2. Design thesis confirming A+C + playground-first UX — with named type/color/motion choices  
3. Component-level implementation plan against the current repo  
4. Explicit keep / redesign / delete list for existing UI pieces  
5. Ordered build sequence for a one-shot execution pass  
6. Only remaining blockers (ideally none)

---

## Decisions locked this draft

| Question | Decision |
|----------|----------|
| Hero treatment | Single iconic plate; **different image each refresh** |
| Playground placement | **Immediately under the hero** |
| Presets | **Stretch only** (explained above; not needed to understand or ship v1) |
| Specimen labels | **Filename-derived for now** |
| Font loves/refuses | **Undecided** — Plan/implementation may propose a pairing within the craft bar; swap if Brandon vetoes |

## Open questions still useful (optional)

1. **Copy tone:** Keep casual first-person throughout, or tighter utility copy with a personal closer/about plate?  
2. **Hidden sections:** Freely delete unfinished Examples / Sample URLs after rescuing anything useful into proofs? (Brief bias: **yes**.)  
3. **Success metric for one-shot:** “Award-level memorable,” “obviously better + on-direction,” or good enough once IA + craft bar are hit?  
4. **Hero ↔ playground link:** Should choosing nothing in the hero still let the playground open on a random/default bug, and should the hero specimen optionally seed the playground on “Use this specimen”? (Brief bias: playground works standalone; optional “use this one” is a nice touch if cheap.)

---

## Appendix A — Current API surface (do not break)

```
GET /api/
GET /api/{width}/{height}
  ?image={index}
  &saturation={1-9}
  &blur={1-9}
  &contrast={1-9}
  &tint={hex}
```

Photos: original work by Brandon; also generally on Flickr. Credit and ownership stay visible in spirit on the site.

## Appendix B — Current homepage section inventory

Rough order today:

1. Navigation (logo + theme toggle)  
2. Header (stub) / page intro line  
3. ImageGallery (GSAP horizontal)  
4. Bug Builder  
5. Dimensions demos  
6. Saturation demos  
7. Blur demos  
8. Contrast demos  
9. Tint demos  
10. Examples (hidden)  
11. Sample URLs (hidden)  
12. About  
13. Footer  

Refresh must consciously reorder or reframe this list under playground-first IA — not just restyle in place.

## Appendix C — How to use this brief

1. Iterate remaining open questions until the craft bar feels personal and executable  
2. Enter Plan Mode with this file as the source of truth  
3. Run the short teardown, then execute in one focused implementation pass  
4. Backend follow-ups only after the frontend is something you’re proud to show  

---

*Draft v3.1. Direction locked: Contemporary Entomology Lab (A + C + playground-first UX). Hero = single rotating iconic plate; playground under hero; labels = filenames; presets = stretch.*
