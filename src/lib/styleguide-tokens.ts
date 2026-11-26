import type { CSSProperties } from 'react'
import tokens from '../../docs/figma/bug-ipsum-refresh.tokens.json'

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

export function fontFamily(alias: unknown): string {
  if (alias === '{fontFamily.display}') return 'var(--font-display), Georgia, serif'
  if (alias === '{fontFamily.text}') return 'var(--font-text), Georgia, serif'
  return 'var(--font-mono), ui-monospace, monospace'
}

export function specimenStyle(value: unknown): CSSProperties {
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

export function dimensionPx(name: string): number {
  const value = dimensionTree[name]?.$value
  if (isRecord(value) && typeof value.value === 'number') return value.value
  return 0
}

export const FIGMA_DIMENSION_KEYS = [
  'radius-plate',
  'button-border',
  'focus-outline',
  'focus-offset',
  'button-gap',
  'button-padding-inline-quiet',
  'button-padding-inline-primary',
  'button-min-height',
] as const

/** Tailwind default 4px ladder (preferred steps from docs/tokens.md). */
export const TAILWIND_SPACING_STEPS = [
  { token: '1', px: 4 },
  { token: '2', px: 8 },
  { token: '3', px: 12 },
  { token: '4', px: 16 },
  { token: '6', px: 24 },
  { token: '8', px: 32 },
  { token: '10', px: 40 },
  { token: '12', px: 48 },
  { token: '16', px: 64 },
] as const

export const TYPE_UTILITY_CLASSES = [
  { className: 'type-section', sample: 'Section headline', caption: 'font-display · 5xl–6xl' },
  { className: 'type-subsection', sample: 'Subsection', caption: 'font-display · 3xl–4xl' },
  { className: 'type-lede', sample: 'Supporting lede copy for a section.', caption: 'text-lg · muted' },
  { className: 'type-display-italic', sample: 'Display italic', caption: 'font-display italic · 4xl–5xl' },
  { className: 'specimen-label', sample: 'Catalog label', caption: 'mono · uppercase · tracking' },
] as const

export function typographyTokenEntries(): [string, TokenNode][] {
  return Object.entries(typeTree)
}

export const FONT_ROLES = [
  { role: 'Display', cssVar: '--font-display', tailwind: 'font-display', family: 'Fraunces' },
  { role: 'Text', cssVar: '--font-text', tailwind: 'font-text', family: 'Source Serif 4' },
  { role: 'Mono', cssVar: '--font-mono', tailwind: 'font-mono', family: 'Geist Mono' },
] as const