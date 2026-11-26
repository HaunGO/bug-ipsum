import type { CSSProperties } from 'react'
import tokens from '../../docs/figma/bug-ipsum-refresh.tokens.json'

/** Maps Figma alias strings like {color.paper.100} to CSS primitive var references. */
function aliasToCssVar(alias: string): string | null {
  const match = alias.match(/^\{color\.([a-z]+)\.([a-z0-9-]+)\}$/)
  if (!match) return null
  const [, group, name] = match
  return `var(--${group}-${name})`
}

type SemanticGroup = 'plate' | 'cabinet'

const semanticCssKeys: Record<string, string> = {
  'surface-page': '--surface-page',
  'surface-raised': '--surface-raised',
  'surface-sunken': '--surface-sunken',
  'text-primary': '--text-primary',
  'text-muted': '--text-muted',
  line: '--line',
  accent: '--accent',
  'on-accent': '--on-accent',
}

function semanticVarsFor(group: SemanticGroup): CSSProperties {
  const colorTree = tokens.color as unknown as Record<string, Record<string, { $value?: string }>>
  const entries = colorTree[group]
  const vars: Record<string, string> = {}

  for (const [tokenName, cssKey] of Object.entries(semanticCssKeys)) {
    const alias = entries[tokenName]?.$value
    if (typeof alias !== 'string') continue
    const resolved = aliasToCssVar(alias)
    if (resolved) vars[cssKey] = resolved
  }

  vars.colorScheme = group === 'plate' ? 'light' : 'dark'
  return vars as CSSProperties
}

/** Inline overrides for plate (light) semantic tokens — sourced from token aliases, not duplicated hex. */
export const plateThemeVars = semanticVarsFor('plate')

/** Inline overrides for cabinet (dark) semantic tokens. */
export const cabinetThemeVars = semanticVarsFor('cabinet')

/** What components use — mapped in tailwind.config.ts. */
export const SEMANTIC_COLOR_TOKENS = [
  { key: 'surface-page', cssVar: '--surface-page', tailwind: 'bg-page', kind: 'surface' as const },
  { key: 'surface-raised', cssVar: '--surface-raised', tailwind: 'bg-raised', kind: 'surface' as const },
  { key: 'surface-sunken', cssVar: '--surface-sunken', tailwind: 'bg-sunken', kind: 'surface' as const },
  { key: 'text-primary', cssVar: '--text-primary', tailwind: 'text-ink', kind: 'text' as const },
  {
    key: 'text-muted',
    cssVar: '--text-muted',
    tailwind: 'text-muted-foreground (plate: ink-700, cabinet: ink-500)',
    kind: 'text' as const,
  },
  { key: 'line', cssVar: '--line', tailwind: 'border-line', kind: 'line' as const },
  { key: 'accent', cssVar: '--accent', tailwind: 'bg-accent / text-accent / ring-ring', kind: 'accent' as const },
  { key: 'on-accent', cssVar: '--on-accent', tailwind: 'text-on-accent', kind: 'text' as const },
] as const

/** shadcn/ui CSS variables in globals.css — each aliases a Bug Ipsum semantic token. */
export const SHADCN_THEME_ALIASES = [
  { shadcnVar: '--background', semanticVar: '--surface-page', tailwind: 'bg-background · bg-page' },
  { shadcnVar: '--foreground', semanticVar: '--text-primary', tailwind: 'text-foreground · text-ink' },
  { shadcnVar: '--card', semanticVar: '--surface-raised', tailwind: 'bg-card · bg-raised' },
  { shadcnVar: '--card-foreground', semanticVar: '--foreground', tailwind: 'text-card-foreground · text-foreground' },
  { shadcnVar: '--popover', semanticVar: '--card', tailwind: 'bg-popover · bg-card' },
  { shadcnVar: '--popover-foreground', semanticVar: '--foreground', tailwind: 'text-popover-foreground' },
  { shadcnVar: '--secondary', semanticVar: '--card', tailwind: 'bg-secondary · bg-card' },
  { shadcnVar: '--secondary-foreground', semanticVar: '--foreground', tailwind: 'text-secondary-foreground' },
  { shadcnVar: '--muted', semanticVar: '--surface-sunken', tailwind: 'bg-muted · bg-sunken' },
  { shadcnVar: '--muted-foreground', semanticVar: '--text-muted', tailwind: 'text-muted-foreground' },
  { shadcnVar: '--primary', semanticVar: '--accent', tailwind: 'bg-primary · bg-accent' },
  { shadcnVar: '--primary-foreground', semanticVar: '--on-accent', tailwind: 'text-primary-foreground · text-on-accent' },
  { shadcnVar: '--border', semanticVar: '--line', tailwind: 'border-border · border-line' },
  { shadcnVar: '--input', semanticVar: '--border', tailwind: 'border-input · border-border' },
  { shadcnVar: '--ring', semanticVar: '--accent', tailwind: 'ring-ring · ring-accent' },
  { shadcnVar: '--radius', semanticVar: '--radius-plate', tailwind: 'rounded-plate' },
] as const

export type SemanticThemeGroup = SemanticGroup

function tokenHex(value: unknown): string | null {
  if (typeof value !== 'object' || value === null) return null
  const hex = (value as { hex?: string }).hex
  return typeof hex === 'string' ? hex : null
}

export type PrimitiveColorEntry = {
  group: string
  name: string
  cssVar: string
  hex: string | null
  description: string | null
}

/** Figma/import tier — paper, ink, pin primitives from handoff JSON. */
export function primitiveColorEntries(): PrimitiveColorEntry[] {
  const colorTree = tokens.color as unknown as Record<
    string,
    Record<string, { $value?: unknown; $description?: string }>
  >
  const groups = ['paper', 'ink', 'pin'] as const
  const entries: PrimitiveColorEntry[] = []

  for (const group of groups) {
    const bucket = colorTree[group]
    if (!bucket) continue
    for (const [name, node] of Object.entries(bucket)) {
      entries.push({
        group,
        name,
        cssVar: `--${group}-${name}`,
        hex: tokenHex(node.$value),
        description: typeof node.$description === 'string' ? node.$description : null,
      })
    }
  }

  return entries.sort((a, b) => a.cssVar.localeCompare(b.cssVar))
}

/** Resolved primitive hex for a semantic token (from Figma handoff aliases). */
export function semanticTokenHex(group: SemanticGroup, tokenKey: string): string | null {
  const colorTree = tokens.color as unknown as Record<string, Record<string, { $value?: string | unknown }>>
  const alias = colorTree[group]?.[tokenKey]?.$value
  if (typeof alias !== 'string') return null
  const match = alias.match(/^\{color\.([a-z]+)\.([a-z0-9-]+)\}$/)
  if (!match) return null
  const [, primitiveGroup, primitiveName] = match
  const primitive = colorTree[primitiveGroup]?.[primitiveName]?.$value
  return tokenHex(primitive)
}