import { Card, CardContent } from '@/components/ui/card'
import {
  FONT_ROLES,
  TYPE_UTILITY_CLASSES,
  specimenStyle,
  typographyTokenEntries,
} from '@/lib/styleguide-tokens'
import { Section } from '../Section'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export function TypographySection() {
  const typeTree = typographyTokenEntries()

  return (
    <Section
      id="typography"
      kicker="02 — Type"
      title="Typography and scale"
      lede="Display, text, and mono roles from layout fonts. Composite recipes mirror Figma typography tokens and globals utilities."
    >
      <div className="space-y-12">
        <div>
          <h3 className="font-mono text-sm text-foreground">Font roles</h3>
          <Card className="mt-4 bg-background">
            <CardContent className="p-0">
              <ul className="divide-y divide-border border-y border-border">
                {FONT_ROLES.map((row) => (
                  <li key={row.role} className="grid gap-2 px-5 py-3 font-mono text-xs sm:grid-cols-4">
                    <span className="text-sm text-foreground">{row.role}</span>
                    <span className="text-muted-foreground">{row.family}</span>
                    <span className="text-muted-foreground">{row.cssVar}</span>
                    <span className="text-muted-foreground">{row.tailwind}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="font-mono text-sm text-foreground">Utility classes</h3>
          <ul className="mt-4 space-y-6">
            {TYPE_UTILITY_CLASSES.map(({ className, sample, caption }) => (
              <li key={className} className="border-b border-border pb-6">
                <p className="font-mono text-xs text-muted-foreground">
                  .{className} · {caption}
                </p>
                <p className={`mt-3 text-foreground ${className}`}>{sample}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-sm text-foreground">Figma typography tokens</h3>
          <Card className="mt-4 bg-background">
            <CardContent className="p-0">
              <ul className="divide-y divide-border border-y border-border">
                {typeTree.map(([name, token]) => {
                  const value = token.$value
                  const size = isRecord(value) && isRecord(value.fontSize) ? value.fontSize.value : null
                  const weight = isRecord(value) && typeof value.fontWeight === 'number' ? value.fontWeight : null
                  return (
                    <li key={name} className="grid gap-3 px-5 py-6 lg:grid-cols-12 lg:items-baseline">
                      <div className="lg:col-span-3">
                        <p className="specimen-label">{name}</p>
                        <p className="mt-2 font-mono text-xs text-muted-foreground">
                          {typeof size === 'number' ? `${size}px` : ''}
                          {weight ? ` · ${weight}` : ''}
                        </p>
                      </div>
                      <p className="min-w-0 text-foreground lg:col-span-9" style={specimenStyle(value)}>
                        {name === 'mono-label' ? 'Specimen No. 001' : 'Bug Ipsum'}
                      </p>
                    </li>
                  )
                })}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  )
}