# Decisions — frontend refresh (Nov 2026)

Locked choices made while implementing [frontend-refresh-brief.md](frontend-refresh-brief.md). Veto any of these and I'll swap them out.

## Information architecture

| Decision | Detail |
|----------|--------|
| Section order | Nav → **Hero plate** → **Bug Builder** (`#builder`) → **Lab proofs** (`#proofs`) → **Collection** (`#collection`) → **About** → Footer. |
| Hero | One specimen, chosen at random **per request** (`page.tsx` calls `connection()`; the homepage is now dynamically rendered instead of static). No text over the photo; caption sits beneath it. |
| Hero ↔ builder | The builder starts on the hero's specimen, so the CTA reads "Build a URL with this bug". The builder also offers **Random bug** (no `image` param). |
| Collection | Kept as a quiet 7×4 grid below the proofs. Selecting a specimen loads it into the builder, scrolls there and focuses it. |
| Hidden sections | *Examples* and *Sample URLs* deleted. Their parameter teaching moved into the proofs and the quick reference; the preset combos are in [backend-followups.md](backend-followups.md). |
| Copy tone | Utility-first in hero / builder / proofs; first person in the collection intro and About. |

## Visual system

| Decision | Detail |
|----------|--------|
| Type | **Fraunces** (display, with SOFT/WONK axes; *Ipsum* set in italic), **Source Serif 4** (text), **Geist Mono** (URLs, parameters, catalog numbers, labels). Mochiy Pop One and Geist Sans removed. |
| Palette — **changed from the plan** | The plan proposed ivory + oxidized copper. Combined with serif type, that's the "warm cream + terracotta serif" AI-landing cluster the brief explicitly rejects. Shipped instead: cool **mount-board grey** (plate) / **green-black cabinet** (dark), with a single **specimen-pin green** accent. See [tokens.md](tokens.md). |
| Cards | Only where they carry interaction: the builder panel, URL field and quick-reference block. Proofs and collection are bare plates. |
| Motion | Three moves, all CSS: hero settle, builder preview "develop" dim/crossfade, collection hover lift. Everything is disabled under `prefers-reduced-motion`. **GSAP removed.** |
| Theme flash | Inline boot script in `<head>` applies the saved/system theme before paint; logos switch by CSS rather than JS. |

## Builder behaviour

- Effects use sliders from 0 to 9, where **0 = off** (the param is omitted). Tick labels sit under the slider positions they describe.
- Width/height are capped at 5000 to match the API; out-of-range input shows a hint and the URL keeps the last valid value.
- Tint: colour picker or hex field (3/6 digits, `#` optional); the URL always writes 6-digit hex without `#`.
- The preview request is debounced 250ms; the copy URL updates instantly.
- The displayed origin is `https://bugipsum.com` on the server and switches to `window.location.origin` after hydration.

## Code / API

- **Specimen list unified.** `src/lib/bug-images.ts` previously listed the photos alphabetically while the API used a different order, so any index-based label would have named the wrong bug (e.g. `?image=14` is the jumping spider; the old frontend list said "inch worm"). `bug-images.ts` now holds the API's exact order, and `image-processing.ts` imports it. Array contents and order are byte-identical to the previous API list (verified by diff), so **every existing URL returns the same photo**. Caching and the Sharp pipeline are untouched.
- Proof "portrait" example changed from `/api/100/300` to `/api/200/300`: at 100px wide the plate was too narrow for its caption.

## Verification (production build, local)

- `next lint`: clean. `next build`: passes; homepage first-load JS **153 kB → 111 kB** (page bundle 47.5 kB → 5.6 kB).
- axe-core (WCAG 2.0/2.1/2.2 A + AA tags): **0 violations** in light and dark.
- Keyboard: skip link → nav → hero CTA → Copy → specimen radios (arrow keys) → size → sliders → tint. Focus visible throughout.
- Copy writes the exact URL to the clipboard; the status is announced.
- 390px mobile: no horizontal overflow.

---

## `.next` and dev server`

Do not run `npm run build` while `npm run dev` is listening on port **3001** (Turbopack). Production build rewrites `.next` and the running dev process then 500s with missing `postcss.js` / build manifests. **`npm run build`** runs [`scripts/check-dev-port.mjs`](../scripts/check-dev-port.mjs) first and exits with an error if that port is in use. CI and fresh clones are unaffected (no local dev). Override port with `BUG_IPSUM_DEV_PORT` if you change the dev script.

## Known gaps

1. Comps A and C (Dribbble / Behance) couldn't be fetched during the teardown; the patterns attributed to them come from the brief's description.
2. `README.md`, `UI_COMPONENTS.md`, `NEXTJS_SETUP.md` and `MIGRATION_GUIDE.md` still describe the old components, GSAP and `image 0–26`. They weren't touched.
3. `postcss.config.mjs` references `@tailwindcss/postcss` (Tailwind v4, not installed). It's shadowed by `postcss.config.js` and was left as-is, but it should be deleted.
4. The homepage is now dynamically rendered (needed for the random hero). It's cheap, but it's no longer served as static HTML from the CDN.
5. In random mode the builder preview changes bug on every parameter tweak (each new URL is a new random draw). This is explained inline, but it can still surprise people.
6. No real-device testing yet (only headless Chromium at 1440 and 390 widths); Safari slider and colour-input styling is unverified.

## Next ten improvements (ranked)

1. **Shareable builder state** via query string (`/?w=800&h=600&image=14#builder`). Cheap, and makes links to recipes possible.
2. **Effect presets** in the builder ("Vintage specimen", "Neon bug", …) from the saved recipes in `backend-followups.md`.
3. Quick **size presets** (avatar / card / hero / OG 1200×630), which cover the most common job in one click.
4. Copy-as **`<img>` / Markdown / CSS** formats next to Copy URL.
5. Humanized specimen names + one line of field notes per plate (the brief's stretch item).
6. Real-device QA pass (iOS Safari, Android Chrome), especially range and colour inputs.
7. Static-shell option: keep the page static and pick the hero client-side with a reserved-space fade, if Vercel cost or TTFB matters.
8. Clean up the stale root docs and the dead PostCSS config.
9. OG image / social card generated from a specimen plate.
10. A11y: verify screen-reader output for the specimen radio group and the copy live region in VoiceOver and NVDA.
