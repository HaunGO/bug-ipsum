import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import tokens from '../../../docs/figma/bug-ipsum-refresh.tokens.json'
import {
  SEMANTIC_COLOR_TOKENS,
  SHADCN_THEME_ALIASES,
  cabinetThemeVars,
  plateThemeVars,
  semanticTokenHex,
  type SemanticThemeGroup,
} from '@/lib/semantic-theme'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Style guide — Bug Ipsum',
  description: 'Semantic colors, type, spacing, and buttons for the Bug Ipsum refresh.',
}

type TokenNode = {
  $type?: string
  $value?: unknown
  $description?: string
  [key: string]: unknown
}

const typeTree = tokens.typography as unknown as Record<string, TokenNode>
const dimensionTree = tokens.dimension as unknown as Record<string, TokenNode>

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function fontFamily(alias: unknown): string {
  if (alias === '{fontFamily.display}') return 'var(--font-display), Georgia, serif'
  if (alias === '{fontFamily.text}') return 'var(--font-text), Georgia, serif'
  return 'var(--font-mono), ui-monospace, monospace'
}

function specimenStyle(value: unknown): CSSProperties {
  if (!isRecord(value)) return {}
  const size = isRecord(value.fontSize) ? value.fontSize.value : undefined
  const lineHeightPx = typeof value.lineHeightPx === 'number' ? value.lineHeightPx : undefined
  const lineHeight = typeof value.lineHeight === 'number' ? value.lineHeight : undefined
  const tracking = isRecord(value.letterSpacing) ? value.letterSpacing : undefined
  return {
    fontFamily: fontFamily(value.fontFamily),
    fontWeight: typeof value.fontWeight === 'number' ? value.fontWeight : 400,
    fontStyle: value.fontStyle === 'italic' ? 'italic' : 'normal',
    fontSize: typeof size === 'number' ? `${size}px` : undefined,
    lineHeight: lineHeightPx ? `${lineHeightPx}px` : lineHeight,
    letterSpacing:
      tracking && typeof tracking.value === 'number' && typeof tracking.unit === 'string'
        ? `${tracking.value}${tracking.unit}`
        : undefined,
    textTransform: value.textCase === 'uppercase' ? 'uppercase' : undefined,
  }
}

function dimensionPx(name: string): number {
  const value = dimensionTree[name]?.$value
  if (isRecord(value) && typeof value.value === 'number') return value.value
  return 0
}

const measures = [
  'radius-plate',
  'button-border',
  'focus-outline',
  'focus-offset',
  'button-gap',
  'button-padding-inline-quiet',
  'button-padding-inline-primary',
  'button-min-height',
] as const

const THEME_PANELS: { title: string; group: SemanticThemeGroup; vars: CSSProperties }[] = [
  { title: 'Plate', group: 'plate', vars: plateThemeVars },
  { title: 'Cabinet', group: 'cabinet', vars: cabinetThemeVars },
]

export default function StyleGuidePage() {
  const gap = dimensionPx('button-gap')
  const radius = dimensionPx('radius-plate')
  const quietPad = dimensionPx('button-padding-inline-quiet')
  const primaryPad = dimensionPx('button-padding-inline-primary')
  const minHeight = dimensionPx('button-min-height')

  return (
    <div className="section-shell section-block">
      <p className="specimen-label">Specimen — Style guide</p>
      <h1 className="type-section mt-3 max-w-3xl">Plate and cabinet</h1>
      <p className="type-lede mt-6 max-w-xl">
        UI primitives come from <strong className="font-normal text-ink">shadcn/ui</strong> (
        <code className="font-mono text-sm text-ink">Button</code>, <code className="font-mono text-sm text-ink">Input</code>,{' '}
        <code className="font-mono text-sm text-ink">Card</code>), themed via semantic CSS variables in{' '}
        <code className="font-mono text-sm text-ink">globals.css</code>. Raw primitives (
        <code className="font-mono text-sm text-ink">paper</code>, <code className="font-mono text-sm text-ink">ink</code>,{' '}
        <code className="font-mono text-sm text-ink">pin</code>) are for Figma import only.
      </p>

      <section className="mt-16" aria-labelledby="colors-title">
        <h2 id="colors-title" className="type-subsection">
          Color — semantics
        </h2>
        <p className="type-lede mt-4 max-w-2xl">
          Nine tokens per theme. <code className="font-mono text-sm text-ink">html.dark</code> swaps plate → cabinet.
          Accent and focus share specimen-pin green by design.
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {THEME_PANELS.map(({ title, group, vars }) => (
            <div key={group} className="border border-line bg-page p-6 text-ink" style={vars}>
              <p className="specimen-label">{title}</p>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {SEMANTIC_COLOR_TOKENS.map((token) => (
                  <SemanticTokenRow key={`${group}-${token.key}`} group={group} token={token} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="shadcn-map-title">
        <h2 id="shadcn-map-title" className="type-subsection">
          shadcn theme → semantics
        </h2>
        <p className="type-lede mt-4 max-w-2xl">
          shadcn&apos;s <code className="font-mono text-sm text-ink">--background</code>,{' '}
          <code className="font-mono text-sm text-ink">--primary</code>, and related vars alias Bug Ipsum semantics — not
          the default shadcn palette.
        </p>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {SHADCN_THEME_ALIASES.map((row) => (
            <li key={row.shadcnVar} className="grid gap-2 py-3 font-mono text-xs sm:grid-cols-3 sm:items-center">
              <span className="text-sm text-ink">{row.shadcnVar}</span>
              <span className="text-muted-foreground">{row.semanticVar}</span>
              <span className="text-muted-foreground">{row.tailwind}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16" aria-labelledby="surfaces-title">
        <h2 id="surfaces-title" className="type-subsection">
          Surfaces &amp; Card
        </h2>
        <p className="type-lede mt-4 max-w-xl">
          Semantic <code className="font-mono text-sm text-ink">bg-page</code> /{' '}
          <code className="font-mono text-sm text-ink">bg-raised</code> /{' '}
          <code className="font-mono text-sm text-ink">bg-sunken</code> match shadcn{' '}
          <code className="font-mono text-sm text-ink">background</code>,{' '}
          <code className="font-mono text-sm text-ink">card</code>, and{' '}
          <code className="font-mono text-sm text-ink">muted</code>.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          <li className="border border-line bg-page p-4 font-mono text-xs text-muted-foreground">
            <span className="specimen-label">surface-page</span>
            <p className="mt-2 text-sm text-ink">Bordered page panel</p>
          </li>
          <li className="border border-line bg-raised p-4 font-mono text-xs text-muted-foreground">
            <span className="specimen-label">surface-raised</span>
            <p className="mt-2 text-sm text-ink">Raised plate</p>
          </li>
          <li className="border border-line bg-sunken p-4 font-mono text-xs text-muted-foreground">
            <span className="specimen-label">surface-sunken</span>
            <p className="mt-2 text-sm text-ink">Input well</p>
          </li>
        </ul>
        <Card className="mt-6 max-w-md border-line bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="font-mono text-sm font-normal text-muted-foreground">Card</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-ink">
            Composed surface using <code className="font-mono text-xs">bg-card</code> (
            <code className="font-mono text-xs">--surface-raised</code>).
          </CardContent>
        </Card>
      </section>

      <section className="mt-20" aria-labelledby="type-title">
        <h2 id="type-title" className="type-subsection">
          Type
        </h2>
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {Object.entries(typeTree).map(([name, token]) => {
            const value = token.$value
            const size = isRecord(value) && isRecord(value.fontSize) ? value.fontSize.value : null
            const weight = isRecord(value) && typeof value.fontWeight === 'number' ? value.fontWeight : null
            return (
              <li key={name} className="grid gap-3 py-6 lg:grid-cols-12 lg:items-baseline">
                <div className="lg:col-span-3">
                  <p className="specimen-label">{name}</p>
                  <p className="mt-2 font-mono text-xs text-muted-foreground">
                    {typeof size === 'number' ? `${size}px` : ''}
                    {weight ? ` · ${weight}` : ''}
                  </p>
                </div>
                <p className="min-w-0 text-ink lg:col-span-9" style={specimenStyle(value)}>
                  {name === 'mono-label' ? 'Specimen No. 001' : 'Bug Ipsum'}
                </p>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="mt-20" aria-labelledby="space-title">
        <h2 id="space-title" className="type-subsection">
          Space
        </h2>
        <p className="type-lede mt-4 max-w-xl">
          Layout uses Tailwind&apos;s 4px scale (4–64px). Measured dimensions below cover buttons and focus; see{' '}
          docs/tokens.md for section recipes.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {measures.map((name) => {
            const px = dimensionPx(name)
            return (
              <li key={name} className="flex items-center gap-4">
                <span
                  className="shrink-0 bg-accent"
                  style={{ width: Math.max(px, 2), height: name === 'button-min-height' ? px : 16 }}
                />
                <span className="font-mono text-sm text-ink">
                  {name} · {px}px
                </span>
              </li>
            )
          })}
        </ul>
        <div
          className="mt-8 grid grid-cols-2 border border-line bg-raised sm:grid-cols-4"
          style={{ gap, padding: quietPad, borderRadius: radius }}
        >
          {['gap 8', 'pad 16', 'pad 20', 'min 44'].map((label) => (
            <div
              key={label}
              className="flex items-center justify-center border border-line bg-page font-mono text-sm text-muted-foreground"
              style={{
                minHeight,
                paddingInline: label === 'pad 20' ? primaryPad : quietPad,
                borderRadius: radius,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20" aria-labelledby="buttons-title">
        <h2 id="buttons-title" className="type-subsection">
          Button (shadcn)
        </h2>
        <p className="type-lede mt-4 max-w-xl">
          <code className="font-mono text-sm text-ink">variant=&quot;default&quot;</code> is the former primary;{' '}
          <code className="font-mono text-sm text-ink">variant=&quot;quiet&quot;</code> is the bordered quiet control.
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <ThemePlate title="Plate" vars={plateThemeVars}>
            <Button type="button">Build a URL</Button>
            <Button type="button" variant="quiet">
              Quiet
            </Button>
          </ThemePlate>
          <ThemePlate title="Cabinet" vars={cabinetThemeVars}>
            <Button type="button">Build a URL</Button>
            <Button type="button" variant="quiet">
              Quiet
            </Button>
          </ThemePlate>
        </div>
      </section>

      <section className="mt-20" aria-labelledby="input-title">
        <h2 id="input-title" className="type-subsection">
          Input (shadcn)
        </h2>
        <p className="type-lede mt-4 max-w-xl">Plate-styled text field — sunken fill, mono, specimen focus ring.</p>
        <div className="mt-8 max-w-md">
          <ThemePlate title="Plate" vars={plateThemeVars}>
            <Input type="text" placeholder="800" className="max-w-[8rem]" aria-label="Width example" />
          </ThemePlate>
        </div>
      </section>
    </div>
  )
}

function SemanticTokenRow({
  group,
  token,
}: {
  group: SemanticThemeGroup
  token: (typeof SEMANTIC_COLOR_TOKENS)[number]
}) {
  const hex = semanticTokenHex(group, token.key)
  const swatchStyle: CSSProperties = {
    background:
      token.kind === 'text'
        ? 'var(--surface-page)'
        : token.kind === 'line'
          ? 'var(--surface-page)'
          : `var(${token.cssVar})`,
    color: token.kind === 'text' ? `var(${token.cssVar})` : undefined,
    boxShadow: token.kind === 'line' ? `inset 0 0 0 3px var(${token.cssVar})` : undefined,
  }

  return (
    <li className="grid gap-3 py-4 sm:grid-cols-[3rem_1fr] sm:items-center">
      <div className="h-10 w-10 rounded-plate border border-line" style={swatchStyle} aria-hidden="true" />
      <div className="min-w-0 font-mono text-xs">
        <p className="text-sm text-ink">{token.key}</p>
        <p className="mt-1 text-muted-foreground">
          {token.cssVar} · {token.tailwind}
          {hex ? ` · ${hex}` : ''}
        </p>
      </div>
    </li>
  )
}

function ThemePlate({
  title,
  vars,
  children,
}: {
  title: string
  vars: CSSProperties
  children: React.ReactNode
}) {
  return (
    <div className="border border-line bg-page p-6 text-ink" style={vars}>
      <p className="specimen-label">{title}</p>
      <div className="mt-6 flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}