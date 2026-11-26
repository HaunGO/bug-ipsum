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
  focus: '--focus',
}

function semanticVarsFor(group: SemanticGroup): CSSProperties {
  const colorTree = tokens.color as Record<string, Record<{ $value?: string }>>
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