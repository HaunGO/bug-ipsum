import type { CSSProperties } from 'react'
import { SEMANTIC_COLOR_TOKENS, semanticTokenHex, type SemanticThemeGroup } from '@/lib/semantic-theme'

type SemanticToken = (typeof SEMANTIC_COLOR_TOKENS)[number]

export function TokenRow({ group, token }: { group: SemanticThemeGroup; token: SemanticToken }) {
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
      <div className="h-10 w-10 rounded-plate border border-border" style={swatchStyle} aria-hidden="true" />
      <div className="min-w-0 font-mono text-xs">
        <p className="text-sm text-foreground">{token.key}</p>
        <p className="mt-1 text-muted-foreground">
          {token.cssVar} · {token.tailwind}
          {hex ? ` · ${hex}` : ''}
        </p>
      </div>
    </li>
  )
}