import {
  SEMANTIC_COLOR_TOKENS,
  SHADCN_THEME_ALIASES,
  cabinetThemeVars,
  plateThemeVars,
  primitiveColorEntries,
  type SemanticThemeGroup,
} from '@/lib/semantic-theme'
import { Card, CardContent } from '@/components/ui/card'
import { Section } from '../Section'
import { TokenRow } from '../TokenRow'
import { AuditNote } from '../AuditNote'

const THEME_PANELS: { title: string; group: SemanticThemeGroup; vars: typeof plateThemeVars }[] = [
  { title: 'Plate', group: 'plate', vars: plateThemeVars },
  { title: 'Cabinet', group: 'cabinet', vars: cabinetThemeVars },
]

const SURFACE_SWATCHES = [
  { label: 'surface-page', shadcn: 'bg-background', className: 'bg-background', description: 'Page / shell' },
  { label: 'surface-raised', shadcn: 'bg-card', className: 'bg-card', description: 'Raised panels' },
  { label: 'surface-sunken', shadcn: 'bg-muted', className: 'bg-muted', description: 'Input wells' },
] as const

export function ColorsSection() {
  const primitives = primitiveColorEntries()

  return (
    <Section
      id="colors"
      kicker="01 — Color"
      title="Palette and semantics"
      lede="Primitives are import-only. Components use semantic CSS variables, mirrored into shadcn theme aliases."
    >
      <div className="space-y-12">
        <div>
          <h3 className="font-mono text-sm text-foreground">Color primitives</h3>
          <p className="mt-2 text-sm text-muted-foreground">Do not use directly in components.</p>
          <Card className="mt-4 bg-background">
            <CardContent className="p-0">
              <ul className="divide-y divide-border border-y border-border">
                {primitives.map((p) => (
                  <li
                    key={p.cssVar}
                    className="grid gap-3 px-5 py-3 sm:grid-cols-[3rem_1fr] sm:items-center"
                  >
                    <div
                      className="h-10 w-10 rounded-plate border border-border"
                      style={{ background: `var(${p.cssVar})` }}
                      aria-hidden
                    />
                    <div className="font-mono text-xs">
                      <p className="text-sm text-foreground">
                        {p.cssVar}
                        {p.hex ? ` · ${p.hex}` : ''}
                      </p>
                      <p className="mt-1 text-muted-foreground">{p.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="font-mono text-sm text-foreground">Semantic tokens</h3>
          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            {THEME_PANELS.map(({ title, group, vars }) => (
              <Card key={group} className="bg-background text-foreground" style={vars}>
                <CardContent className="p-6">
                  <p className="specimen-label">{title}</p>
                  <ul className="mt-6 divide-y divide-border border-y border-border">
                    {SEMANTIC_COLOR_TOKENS.map((token) => (
                      <TokenRow key={`${group}-${token.key}`} group={group} token={token} />
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-mono text-sm text-foreground">shadcn → semantics</h3>
          <Card className="mt-4 bg-background">
            <CardContent className="p-0">
              <ul className="divide-y divide-border border-y border-border">
                {SHADCN_THEME_ALIASES.map((row) => (
                  <li
                    key={row.shadcnVar}
                    className="grid gap-2 px-5 py-3 font-mono text-xs sm:grid-cols-3 sm:items-center"
                  >
                    <span className="text-sm text-foreground">{row.shadcnVar}</span>
                    <span className="text-muted-foreground">{row.semanticVar}</span>
                    <span className="text-muted-foreground">{row.tailwind}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="font-mono text-sm text-foreground">Surfaces</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {SURFACE_SWATCHES.map(({ label, shadcn, className, description }) => (
              <Card key={label} className={`${className} text-foreground`}>
                <CardContent className="p-4 font-mono text-xs">
                  <span className="specimen-label">{label}</span>
                  <p className="mt-2 text-sm text-foreground">{description}</p>
                  <p className="mt-1 text-muted-foreground">{shadcn}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <AuditNote title="Dual Tailwind APIs">
            Semantic utilities (<code className="font-mono text-xs">bg-page</code>,{' '}
            <code className="font-mono text-xs">text-ink</code>) coexist with shadcn (
            <code className="font-mono text-xs">bg-background</code>,{' '}
            <code className="font-mono text-xs">text-foreground</code>). Marketing pages still mix both.
          </AuditNote>
          <AuditNote title="Hardcoded destructive">
            <code className="font-mono text-xs">--destructive</code> in globals.css is fixed red, not from Figma
            primitives.
          </AuditNote>
          <AuditNote title="Focus via accent">
            <code className="font-mono text-xs">--ring</code> and global focus outlines use{' '}
            <code className="font-mono text-xs">--accent</code> (former <code className="font-mono text-xs">--focus</code>{' '}
            removed).
          </AuditNote>
        </div>
      </div>
    </Section>
  )
}