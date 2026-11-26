# Backend follow-ups (not built — post-refresh ideas)

Captured during the frontend refresh so they don't get lost. None of these are implemented; the API contract is unchanged.

## API ideas

- **Seeded random:** `/api/seed/{seed}/{w}/{h}` (Picsum pattern) for a stable "random" image.
- **Metadata endpoint:** `/api/list` → `[{ index, filename, label, width, height }]`, so the frontend could drop its copy of the list.
- **Formats:** `.webp` / `.avif` output; the API currently returns JPEG only.
- **Square shorthand:** `/api/{size}`.
- **Retina:** `@2x` suffix.
- **Response header with the served index** (`X-Bug-Ipsum-Image`) so random requests can be pinned afterwards (Doodle Ipsum's redirect-to-static trick is another option).
- **Larger library workflow:** drop-in folder + generated manifest, instead of editing `bug-images.ts` by hand.
- **Analytics-driven UX:** which sizes and effects people actually copy.

## Preset recipes (rescued from the deleted "Sample URLs" / "Examples" sections)

Candidates for one-click builder presets (stretch) or a future `?preset=` param:

| Name | Params |
|------|--------|
| Neon bug | `saturation=8&contrast=7&blur=2&tint=00ffff` |
| Vintage specimen | `tint=8b4513&contrast=3&blur=2&saturation=3` |
| Desert bug | `saturation=7&contrast=7&tint=ff8533&blur=2` |
| Creepy crawler | `saturation=9&contrast=8&tint=ff0000&blur=1` |
| Moonlight | `saturation=4&contrast=6&tint=3d3d5c&blur=1` |
| High-contrast B&W | `saturation=1&contrast=8&blur=2` |
| Desaturated + blur | `saturation=1&blur=2` |
| Bug avatar (150×150) | `blur=3&saturation=6` |
| Entomology banner (1200×400) | `tint=6366f1&saturation=5&contrast=6` |
| Bug thumbnail (280×200) | `blur=1&saturation=7` |
