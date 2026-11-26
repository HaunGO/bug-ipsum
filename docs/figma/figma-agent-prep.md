# Bug Ipsum Refresh — prep for the Figma agent

Work in the existing Figma Design file on the personal account. Tailwind and the CSS variables are the source of truth. Do not invent values that are not in the code, and do not publish this file into The Johnson Group.

## Local site

The refresh is running on this machine:

http://localhost:3001

Start command, from the repo root, if it is not already up: `npm run dev` (`next dev --turbopack -p 3001`). Branch: `frontend-refresh`.

Figma’s cloud cannot fetch localhost. Use the page on this machine, and the files below, as the reference. Plate is the light theme (`:root`). Cabinet is the dark theme (`html.dark`).

## Source of truth

If a Figma value and the code disagree, the code wins.

| What | Where |
| --- | --- |
| Color primitives, plate and cabinet semantics, radius, focus ring, `.btn-primary`, `.btn-quiet` | `src/app/globals.css` |
| Tailwind names for those CSS variables (`bg-page`, `text-ink`, `font-display`, `rounded-plate`, `min-h-11`) | `tailwind.config.ts` |
| Fonts: Fraunces (`--font-display`), Source Serif 4 (`--font-text`), Geist Mono (`--font-mono`) | `src/app/layout.tsx` |
| Written palette notes | `docs/tokens.md` |

There is no React `Button` component. Primary and Quiet are the classes `.btn-primary` and `.btn-quiet`. Disabled is not in the stylesheet. Do not add a disabled color, variant, or variable.

## Figma file

https://www.figma.com/design/eoEasW5XkZ54fXEwS5yE6P/Bug-Ipsum-Refresh

File key `eoEasW5XkZ54fXEwS5yE6P`. Personal account `haungo@gmail.com`, team “Brandon's team”, Professional plan, Full seat. The file is in Drafts and is still empty of variables.

Stay on that account. Do not use the work login (`bhaun@johngroup.com`, The Johnson Group). One mode only. Do not publish a library.

## Tokens file

`docs/figma/bug-ipsum-refresh.tokens.json`

It is one DTCG-style JSON document, meant as a single mode. Nested names are folders. Plate and cabinet are folders of aliases inside `color`, not a second mode.

| Group | What it holds | Figma variables import |
| --- | --- | --- |
| `color` | Primitives `paper` (50, 100, 200, 300), `ink` (1000, 950, 900, 850, 700, 600, 400, 100), `pin` (700, 300). Each `$type` is `color`. `$value` is an sRGB object: `colorSpace`, `components` (0–1), `alpha`, `hex`. | Supported |
| `color.plate` and `color.cabinet` | Semantic aliases: `surface-page`, `surface-raised`, `surface-sunken`, `text-primary`, `text-muted`, `line`, `accent`, `on-accent`, `focus`. Values are strings like `{color.paper.100}`. | Supported, as color aliases |
| `fontFamily` | `display` Fraunces, `text` Source Serif 4, `mono` Geist Mono. `$type` `fontFamily`, `$value` a single font name. | Supported, becomes a string variable |
| `dimension` | `radius-plate` 2px, `button-min-height` 44px, `button-gap` 8px, `button-padding-inline-primary` 20px, `button-padding-inline-quiet` 16px, `button-border` 1px, `focus-outline` 2px, `focus-offset` 3px. `$type` `dimension`, unit `px`. | Supported, becomes a number variable |
| `typography` | Nine composites: `display-hero`, `display-section`, `display-subsection`, `display-italic`, `body`, `body-lede`, `mono-label`, `mono-control`, `mono-url`. `$type` is `typography`. Values mix a font alias, weight, style, a px `fontSize`, unitless `lineHeight`, `letterSpacing` in **em**, and sometimes a `sizes` array. | Not a variable type |
| `component` | Button notes for `primary` (`btn-primary`) and `quiet` (`btn-quiet`): layout, default, hover, and `disabled.definedInSource: false`. No `$type` or `$value` on those objects. | Not a token group |
| `codeConnect` | File key, links to `figma.config.json` and `src/components/ui/Button.figma.ts`, and class mappings. Includes a `mappings` array. No `$type` or `$value`. | Not a token group |

Hex values match `globals.css`: paper `#f7f7f4` `#eeeeea` `#e4e4de` `#c9cbc4`; ink `#0b0c0b` `#0f1110` `#181b19` `#1f2320` `#343935` `#4f544f` `#9da39c` `#e9ebe6`; pin `#1f6b4f` `#7fd1a8`.

## Known import error

Importing `docs/figma/bug-ipsum-refresh.tokens.json` into Figma variables fails with “encountered an error importing tokens.”

Figma’s variables import accepts a DTCG JSON file, and only these token types: `color` (sRGB or HSL object), `dimension` (unit must be `px`), `fontFamily` (one font name, not an array), `duration` (seconds), `number`, and `string`. See [Modes for variables](https://help.figma.com/hc/en-us/articles/15343816063383-Modes-for-variables).

This file is rejected as a whole because it also contains:

1. Unsupported composite types. `typography.*` uses `$type: "typography"`. Figma will not turn that into a variable. The values are also outside the dimension rules: `letterSpacing` is in `em`, and `lineHeight` is a unitless number. `sizes` is an array.
2. Groups with no token type. `component` and `codeConnect` are ordinary JSON (strings, numbers, and arrays) and are not tokens with `$type` and `$value`.

`color`, `fontFamily`, and `dimension` in the same file already match the schema. Do not keep re-importing the full file. Either recreate those three groups by hand, or import a copy that contains only `color`, `fontFamily`, and `dimension`. Leave the original tokens file in place; it is still the handoff for type and buttons.

## What to build

### 1. Variables

In Bug Ipsum Refresh, one collection, one mode.

- Color variables for every `color` primitive, then plate and cabinet semantics as aliases to those primitives (same paths as the JSON).
- Number variables for every `dimension` (px numbers: 2, 44, 8, 20, 16, 1, 2, 3).
- String variables for the three font families.

Do not add a second mode for cabinet. Do not add a disabled color.

### 2. Text styles

Create text styles from the `typography` group in the tokens file. These are styles, not variables. Use the px sizes written there (the hero size is the 168px cap of the `clamp`, not a fluid size). Fonts: Fraunces for `display-*`, Source Serif 4 for `body` and `body-lede`, Geist Mono for `mono-*`.

| Style | Family | Weight | Style | Size | Line height | Tracking |
| --- | --- | --- | --- | --- | --- | --- |
| display-hero | Fraunces | 400 | normal | 168 | 0.82 | -0.035em |
| display-section | Fraunces | 400 | normal | 48 (60 at sm, 72 at lg on the builder title only) | 1 | -0.025em |
| display-subsection | Fraunces | 400 | normal | 30 (36 at sm) | 36px (40px at sm) | 0 |
| display-italic | Fraunces | 400 | italic | 36 (48 at sm) | 40px (48px at sm) | -0.025em |
| body | Source Serif 4 | 400 | normal | 16 | 24px | 0 |
| body-lede | Source Serif 4 | 400 | normal | 18 (20 at sm on the hero lede) | 1.625 | 0 |
| mono-label | Geist Mono | 400 | normal, uppercase | 12 | 16px | 0.14em |
| mono-control | Geist Mono | 400 (500 on primary buttons) | normal | 14 | 20px | 0 |
| mono-url | Geist Mono | 400 | normal | 16 (18 at sm) | 1.625 | 0 |

### 3. Button component

One component, not two unrelated frames.

- Variant property `Kind`: `Primary` | `Quiet`.
- Text property or text layer named `Label`.
- States: default and hover only.

Primary (`.btn-primary`): inline flex, min height 44, gap 8, radius 2, padding inline 20, fill `plate/accent`, label `plate/on-accent`, mono 14 / medium (500). Hover is the same fill at opacity 0.9.

Quiet (`.btn-quiet`): same height, gap, and radius, padding inline 16, 1px border `plate/line`, transparent fill, label `plate/text-primary`, mono 14 / regular (400). Hover changes the border to `plate/text-primary`.

No disabled variant.

### 4. Code Connect

Mapping files already in the repo:

- `figma.config.json` — parser `react`, include `src/**/*.figma.ts`, label `React`.
- `src/components/ui/Button.figma.ts` — parserless template (`import figma from 'figma'`, not `figma.connect()`). `Kind` Primary → `btn-primary`, Quiet → `btn-quiet`. Snippet: `<button type="button" className="${kind}">${text}</button>`. The `url=` comment still points at page node `0:1` because no Button component exists yet.

After the component exists, point that `url=` comment at the component’s node, and keep the property names `Kind` and `Label` so `getEnum('Kind')` and `findText('Label')` match. `tsconfig.json` excludes `**/*.figma.ts` so `import figma from 'figma'` does not break the app. Do not rename the template to `.figma.tsx`.

Live Code Connect publish needs a published library component and an Organization or Enterprise plan. This file is on Professional, so creating the component and correcting the template URL is the setup. Do not switch to the work org to publish, and do not install `@figma/code-connect` unless asked.

## Leave alone

Do not change Tailwind, `globals.css`, or the button classes to match Figma. Do not commit unless asked.
