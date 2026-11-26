import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import tokens from '../../../docs/figma/bug-ipsum-refresh.tokens.json'
import { cabinetThemeVars, plateThemeVars } from '@/lib/semantic-theme'

export const metadata: Metadata = {
  title: 'Style guide — Bug Ipsum',
  description: 'Colors, type, spacing, and buttons for the Bug Ipsum refresh.',
}

type TokenNode = {
  $type?: string
  $value?: unknown
  $description?: string
  [key: string]: unknown
}

const colorTree = tokens.color as unknown as Record<string, Record<string, TokenNode>>
const typeTree = tokens.typography as unknown as Record<string, TokenNode>
const dimensionTree = tokens.dimension as unknown as Record<string, TokenNode>

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function tokenHex(value: unknown): string | null {
  if (!isRecord(value)) return null
  return typeof value.hex === 'string' ? value.hex : null
}

function resolveColor(value: unknown): { hex: string; cssVar: string } | null {
  if (typeof value === 'string') {
    const match = value.match(/^\{color\.([a-z]+)\.([a-z0-9-]+)\}$/)
    if (!match) return null
    const [, group, name] = match
    const target = colorTree[group]?.[name]
    const hex = tokenHex(target?.$value)
    if (!hex) return null
    return { hex, cssVar: `--${group}-${name}` }
  }
  const hex = tokenHex(value)
  return hex ? { hex, cssVar: '' } : null
}

const primitiveGroups = ['paper', 'ink', 'pin'] as const
const semanticGroups = ['plate', 'cabinet'] as const

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

export default function StyleGuidePage() {
  const gap = dimensionPx('button-gap')
  const radius = dimensionPx('radius-plate')
  const quietPad = dimensionPx('button-padding-inline-quiet')
  const primaryPad = dimensionPx('button-padding-inline-primary')
  const minHeight = dimensionPx('button-min-height')

  return (
    <div className="section-shell py-16 lg:py-24">
      <p className="specimen-label">Specimen — Style guide</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl font-normal tracking-tight sm:text-6xl">
        Plate and cabinet
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
        The colors, type, and measures behind the refresh. Swatches and type use the live CSS variables.
        Names and hex values come from the token file.
      </p>

      <section className="mt-16" aria-labelledby="colors-title">
        <h2 id="colors-title" className="font-display text-3xl font-normal sm:text-4xl">
          Color
        </h2>
        <div className="mt-8 space-y-10">
          {primitiveGroups.map((group) => (
            <div key={group}>
              <p className="specimen-label">{group}</p>
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {Object.entries(colorTree[group]).map(([name, token]) => {
                  const hex = tokenHex(token.$value)
                  return (
                    <li key={name} className="overflow-hidden rounded-plate border border-line">
                      <div className="h-16" style={{ background: hex ?? 'transparent' }} />
                      <div className="px-3 py-2">
                        <p className="font-mono text-sm text-ink">
                          {group}-{name}
                        </p>
                        <p className="font-mono text-xs text-muted">{hex}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}

          {semanticGroups.map((group) => (
            <div key={group}>
              <p className="specimen-label">{group === 'plate' ? 'Plate — light' : 'Cabinet — dark'}</p>
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {Object.entries(colorTree[group]).map(([name, token]) => {
                  const resolved = resolveColor(token.$value)
                  return (
                    <li key={name} className="overflow-hidden rounded-plate border border-line">
                      <div
                        className="h-16"
                        style={{ background: resolved ? `var(${resolved.cssVar})` : 'transparent' }}
                      />
                      <div className="px-3 py-2">
                        <p className="font-mono text-sm text-ink">
                          {group}/{name}
                        </p>
                        <p className="font-mono text-xs text-muted">{resolved?.hex}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20" aria-labelledby="type-title">
        <h2 id="type-title" className="font-display text-3xl font-normal sm:text-4xl">
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
                  <p className="mt-2 font-mono text-xs text-muted">
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
        <h2 id="space-title" className="font-display text-3xl font-normal sm:text-4xl">
          Space
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          These are the measured tokens, not a repeating scale. The grid below uses the button gap, radius, and minimum height.
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
              className="flex items-center justify-center border border-line bg-page font-mono text-sm text-muted"
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
        <h2 id="buttons-title" className="font-display text-3xl font-normal sm:text-4xl">
          Buttons
        </h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <ThemePlate title="Plate" vars={plateThemeVars}>
            <button type="button" className="btn-primary">
              Build a URL
            </button>
            <button type="button" className="btn-quiet">
              Quiet
            </button>
          </ThemePlate>
          <ThemePlate title="Cabinet" vars={cabinetThemeVars}>
            <button type="button" className="btn-primary">
              Build a URL
            </button>
            <button type="button" className="btn-quiet">
              Quiet
            </button>
          </ThemePlate>
        </div>
      </section>
    </div>
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
    <div className="rounded-plate border border-line bg-page p-6 text-ink" style={vars}>
      <p className="specimen-label">{title}</p>
      <div className="mt-6 flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}
