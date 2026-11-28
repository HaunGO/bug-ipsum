# Bug Ipsum homepage — code handoff

Handoff for a **new agent session**. Do not continue the Figma session that produced this file.

The approved design is already in Figma. The next job is to build that frame in code, section by section, with Code Connect as the bridge. Do not redraw the page, do not invent a parallel token set, and do not start from the parked “previous homepage” plates.

## Start a clean session

- Open a **totally separate session**. Do not resume the Figma-editing chat.
- Use **Code Connect** before writing UI. Map every token, text style, and component that the frame uses. If a connection is missing, add the mapping first. Do not duplicate tokens by hand (no second hex map, no copied spacing scale beside `globals.css` / the Figma variables).
- Build **section by section** against the frame: Navigation, then Hero, then Feature strip. Check each section against the frame before starting the next.
- The code must match the Figma frame: tokens, style guide, typography, and spacing. Where this document records a departure from the current stylesheet, the **frame wins** for this homepage. Say so in the implementation rather than silently reverting to pin-green buttons or the old stacked wordmark.

## Approved frame

- File: [Bug Ipsum Refresh](https://www.figma.com/design/eoEasW5XkZ54fXEwS5yE6P/Bug-Ipsum-Refresh?node-id=23-2)
- File key: `eoEasW5XkZ54fXEwS5yE6P`
- Frame: `Homepage / Plate / 1440` — node `23:2`
- Page: `Homepage` — node `21:2`
- Width: **1440**. Theme: **Plate** (light). One variable mode, `Default`.
- Scope of this iteration: **navigation, hero, and feature strip only.**

The earlier builder, lab proofs, collection, and about plates were moved out of the frame into a sibling frame named `Previous homepage sections` (node `28:82`, to the right of the homepage). Leave that frame alone unless a later task asks for those sections.

## Screenshots

`/tmp` copies are from the design session and may disappear. Repo copies:

| What it shows | Session path | Repo copy |
| --- | --- | --- |
| Full frame after the first composition. Feature icons are still **beside** the headings. Do not treat this as the final strip. | `/tmp/homepage-figma-2.png` | `docs/figma/handoff/homepage-figma-2.png` |
| Feature strip **after** icon-above, padding, and the alignment fix. This is the approved strip. | `/tmp/feature-strip-aligned.png` | `docs/figma/handoff/feature-strip-aligned.png` |

The live frame is the source of truth. The full-page PNG is stale for the bottom strip.

## What changed on the feature strip

All four items are instances of the `Feature` component (`28:75`).

1. **Icons sit above the headings.** Layout is vertical: icon, then title, then description. It was horizontal (icon beside the text block).
2. **Padding on each section:** 24px left and right, 16px top and bottom. Gap between icon and text block remains 16px.
3. **Alignment fix.** After that padding, Real Photography and Fast & Reliable were still on a shorter fixed height (86px) than Full Control and Easy to Integrate (110px). The strip was vertically centering its children, so the first and last icons and headings sat about **12px lower**. Each section now **hugs its content** (154px) and they **share the same top edge**. The strip’s counter-axis alignment is `MIN` (top), not center.
4. **Divider lines were not restyled.** Three 1px vertical rules between the sections, full height of the row, plus the existing 1px top stroke on the strip. Leave them.

Approved strip copy, unchanged:

- Real Photography — Original insect photos, not generated images.
- Full Control — Customize size, specimen, saturation, contrast, blur and tint.
- Easy to Integrate — A simple, consistent API designed for developers and designers.
- Fast & Reliable — Lightweight, cache-friendly and ready for any project.

Icons are Lucide, from `lucide-react`: camera, sliders-horizontal, layers, zap. They are stroked or filled in ink `#0F1110`. Those strokes are **not** bound to a color variable. When connecting them, bind the stroke/fill to `color/plate/text-primary` instead of pasting the hex again.

## Frame content the code must match

### Navigation

- Inset 112px (same as `.section-shell` at 1440: `(1440 - 1280) / 2 + 32`).
- Brand lockup (`28:49`): Lucide bug icon at 22px, then the Wordmark.
- Wordmark (`28:46`): Fraunces 26px, tracking −3.5%, line-height 32. **“Bug” is roman. “Ipsum” is italic**, including the leading space. Do not italicize both words. The old nav text did.
- Hairline, then the tagline **`A BUGGY LITTLE API.`** on text style `mono-label` (Geist Mono 12, uppercase, tracking 0.14em), color `plate/text-primary` (not muted).
- Links, text style `body` (Source Serif 4, 16): API, Docs, Examples, Gallery, Style Guide. Component: `Nav Link` (`28:65`), text property `Label`.
- Button instance, variant **Default**: label `Build a URL →`. See the button departure below.

### Hero

Three columns, top-aligned, gap 32, padding 112 / 64 / 112 / 72 (left, top, right, bottom).

- Copy column width 472.
  - Kicker `Specimen no. 10` on `mono-label`, color `plate/text-muted`, followed by a 1px rule in `plate/line`.
  - Headline: `Beautiful` / `bug photos` / `on demand.` Fraunces **72px**, line-height 92%, tracking −2.5%. The last line is **Fraunces Italic**. There is no text style for that size and mix. It was started from `display-section` (48px); setting 72px detaches the style. Do not ship it as `display-hero` (168px).
  - Lede on **`body-lede` as published** (Source Serif 4, 18px, line-height 29.25, `plate/text-muted`). The token file’s sm hero lede is 20px. Overriding the size detaches the style, so the frame keeps 18. Keep the style binding.
  - URL field (`28:67`), text property `URL`: `https://bugipsum.com/api/640/640?image=10`. Style `mono-url`. Fill `plate/surface-sunken`, stroke `plate/line`, radius `dimension/radius-plate`, min-height `dimension/button-min-height`. Copy icon at 16px.
  - Actions, gap `dimension/button-gap`: `Build a URL →` (Button Default) and `View Examples` (Button Outline).
- Photograph: 472×472, radius `dimension/radius-plate`, 1px inside stroke `plate/line`, image fill `FILL`. Node `29:41`. Image hash `ee8fc5202c27cca2aac17e143356298b88010722`. Source file: `public/images/bugs/only/beetle-on-a-leaf_27937308242_o.jpg`.
- Metadata column width 208. This **replaces** the concept’s engraving and millimeter scale. Do not draw those, and do not invent a family name.

### Specimen — use the catalog, not the concept caption

Index **10** (`bugImages[10]` in `src/lib/bug-images.ts`).

| Field | Value |
| --- | --- |
| Plate | `No. 10` via `formatPlateNumber` (2-digit, not `010`) |
| Common name | Beetle on a leaf (Fraunces Italic 22 / 28). Not “Leaf beetle (Chrysomelidae)”. |
| Format | JPG |
| Size | 640 × 640 |
| Index | `?image=10` |
| Source | BugIpsum API |
| File | `beetle-on-a-leaf_27937308242_o.jpg` |

`filenameToLabel` / `formatPlateNumber` in `src/lib/specimen-labels.ts` are the source of the name and plate number.

### Feature strip

- Padding 40 top, 56 bottom, 112 left and right. Top stroke 1px `plate/line`. Horizontal auto-layout, counter-axis **MIN**, item spacing 0.
- Four `Feature` instances, `FILL` width, **HUG** height, equal top. Vertical 1px dividers between them, `FILL` height, `plate/line`.
- Each feature: padding 16 / 24 / 16 / 24, vertical, counter-axis MIN, item spacing 16. Title is Fraunces 20 / 26, `plate/text-primary`. Description is text style `body`, `plate/text-muted`, wrapping to the column (about 255px inside the padding).

## Design-system departures already in the frame

Do not “correct” these back to the old homepage without a new decision. Do not add new ones.

| Decision | Why |
| --- | --- |
| Filled CTAs use `color/plate/text-primary` (ink), not `color/plate/accent` (pin). | The approved composition keeps saturated color in the photograph. The Button component itself was **not** edited. This is an instance fill override on the two `Build a URL →` instances. Radius, type, and height stay on the component (`dimension/radius-plate` is 2px, not the rounder corners in the early concept). |
| Headline 72px with an italic last line. | No text style matches. `display-section` is 48; `display-italic` is 36; `display-hero` is 168 and is the stacked wordmark size, not this sentence. |
| Wordmark 26px, italic on Ipsum only. | No mixed-style text style. |
| Feature titles 20px Fraunces. | Between `body` (16, Source Serif) and `display-subsection` (30). |
| Lede stays `body-lede` at 18px. | The documented sm size is 20. Applying 20 detaches the style. |
| Lucide icons, ink `#0F1110`, unbound. | No icon components existed. Bind them when connecting; do not introduce a second ink. |
| Catalog specimen 10, not the concept’s scientific name, engraving, or scale. | `docs/brand-prompt/logo.md` says not to invent identifications. |

## Code Connect — map these before building

Config: `figma.config.json` (parser `react`, include `src/**/*.figma.ts`). Templates must stay `.figma.ts`, not `.figma.tsx`.

Existing templates:

- `src/components/ui/Button.figma.ts` — `url=` node `4:63`. Live component properties are `Label`, `Variant` (Default, Quiet, Outline, Ghost, Link), `Size` (Default, Small, Icon), `State` (Default, Hover, Focus, Disabled). The homepage uses **Default** and **Outline**, size Default, state Default.
- `src/components/ui/FieldInput.figma.ts` — `url=` is still `REPLACE_WITH_INPUT_NODE`. The real field is **Url Field `28:67`**, text property `URL`. Point the template at that node before using it. Do not create a second input component.

`docs/figma/figma-agent-prep.md` still describes Button as `Kind: Primary | Quiet` and a disabled-free pair. The **published component on the canvas** is the Variant / Size / State set above. Trust the component’s `componentPropertyDefinitions`, not that older paragraph. The prep doc is still right that primary fill in the component is `plate/accent` and that disabled is not a stylesheet color. The homepage’s ink fill is the instance override described above.

### Gap audit (Figma component → code)

| Figma | Node | Code counterpart | Gap |
| --- | --- | --- | --- |
| Button | `4:63` | `src/components/ui/button.tsx` + `Button.figma.ts` | Mapped, but the template’s Variant enum must be checked against `button.tsx` before codegen. Homepage Default instances are ink, not the pin fill baked into the component. Outline’s label layer was not driven by `Label#4:0` (property value was “View Examples” while the text still read “Button”); the instance text was overridden. Confirm the variant actually exposes `Label` before relying on the property. |
| Url Field | `28:67` | `FieldInput.figma.ts` intended for `field-input` | **Unmapped.** Placeholder URL. |
| Nav Link | `28:65` | none | **No component, no Code Connect.** |
| Wordmark | `28:46` | none | **No component.** Must be Fraunces roman + italic, not `logo-black.png` (that asset is a stacked geometric BUG / IPSUM). |
| Brand lockup | `28:49` | none | **No component.** |
| Specimen Meta | `28:72` | none | **No component.** Text props `Label`, `Value`. |
| Feature | `28:75` | none | **No component.** Text props `Title`, `Description`. Instance-swap prop `Icon`. |
| Icon/Bug, Camera, Sliders, Layers, Zap, Copy | under `Components — homepage` | `lucide-react` glyphs only | **No Code Connect.** |

Variables and text styles are not Code Connect components. Connect them to the existing sources below. Do not recreate them.

### Tokens and styles to connect, not copy

| Figma | Code |
| --- | --- |
| Variable collection `Bug Ipsum Refresh`, mode `Default` | `src/app/globals.css` and `docs/figma/bug-ipsum-refresh.variables.json` |
| Semantic plate colors used on the frame: `surface-page`, `surface-sunken`, `text-primary`, `text-muted`, `line` | `--surface-page`, `--surface-sunken`, `--text-primary`, `--text-muted`, `--line` |
| `dimension/radius-plate`, `button-min-height`, `button-gap`, `button-border` | the dimension tokens in the variables JSON / globals |
| Text styles `display-section` (reference only), `body`, `body-lede`, `mono-label`, `mono-control`, `mono-url` | `docs/figma/bug-ipsum-refresh.tokens.json` typography group and the classes in `globals.css` |
| Fonts | Fraunces (`--font-display`), Source Serif 4 (`--font-text`), Geist Mono (`--font-mono`) from `src/app/layout.tsx` |

Useful reading, in this order: this file, the Figma frame, `docs/figma/figma-agent-prep.md`, `docs/tokens.md`, `docs/figma/bug-ipsum-refresh.tokens.json`, `DESIGN_CONTEXT.md`, `src/lib/bug-images.ts`, `src/lib/specimen-labels.ts`.

## Working tree at handoff

This design session did **not** edit application source. Figma was the only surface that was changed on purpose.

The user asked that the next agent be told: **changed files: 2 files, +654 lines.** `git diff --stat` at the time this handoff was written does not match that figure. It showed:

- `src/components/ui/Button.figma.ts` — modified, +24 / −5 (not part of the Figma edits in this session)
- Untracked, pre-existing relative to this session: `COLOR_TYPE_DIMENSIONS.md`, `DESIGN_CONTEXT.md`, `docs/brand-prompt/logo.md`, `src/app/contact-sheet/page.tsx`

This handoff adds `docs/figma/homepage-code-handoff.md` and the two PNGs under `docs/figma/handoff/`. Do not assume those are the “2 files, +654 lines.”

## Build order

1. New session. Read this file and open node `23:2`.
2. Code Connect: variables, text styles, Button, then Url Field. Flag anything in the gap table that is still unmapped. Do not hand-copy token values.
3. Navigation.
4. Hero, including the real beetle file and catalog metadata.
5. Feature strip, using the aligned screenshot, not `homepage-figma-2.png`.
6. Stop. Do not build the parked sections.
