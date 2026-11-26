import { Card, CardContent } from '@/components/ui/card'
import { dimensionPx, FIGMA_DIMENSION_KEYS, TAILWIND_SPACING_STEPS } from '@/lib/styleguide-tokens'
import { Section } from '../Section'

export function SpacingSection() {
  const gap = dimensionPx('button-gap')
  const radius = dimensionPx('radius-plate')
  const quietPad = dimensionPx('button-padding-inline-quiet')
  const primaryPad = dimensionPx('button-padding-inline-primary')
  const minHeight = dimensionPx('button-min-height')

  return (
    <Section
      id="spacing"
      kicker="03 — Space"
      title="Spacing scale"
      lede="No spacing CSS variables — Tailwind's 4px base. Figma dimensions document button and focus measures."
    >
      <div className="space-y-10">
        <div>
          <h3 className="font-mono text-sm text-foreground">Tailwind ladder (preferred)</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {TAILWIND_SPACING_STEPS.map(({ token, px }) => (
              <li key={token} className="flex items-center gap-4">
                <span className="shrink-0 bg-primary" style={{ width: px, height: 12 }} />
                <span className="font-mono text-sm text-foreground">
                  {token} · {px}px
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-sm text-foreground">Figma dimensions</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {FIGMA_DIMENSION_KEYS.map((name) => {
              const px = dimensionPx(name)
              return (
                <li key={name} className="flex items-center gap-4">
                  <span
                    className="shrink-0 bg-primary"
                    style={{ width: Math.max(px, 2), height: name === 'button-min-height' ? px : 12 }}
                  />
                  <span className="font-mono text-sm text-foreground">
                    {name} · {px}px
                  </span>
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-sm text-foreground">Layout recipes</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            <code className="font-mono text-xs">.section-shell</code> ·{' '}
            <code className="font-mono text-xs">.section-block</code> · primary button{' '}
            <code className="font-mono text-xs">px-5</code> (20px, off the 4px ladder).
          </p>
          <Card className="mt-4 bg-card" style={{ borderRadius: radius }}>
            <CardContent className="grid grid-cols-2 sm:grid-cols-4" style={{ gap, padding: quietPad }}>
              {['gap 8', 'pad 16', 'pad 20', 'min 44'].map((label) => (
                <div
                  key={label}
                  className="flex items-center justify-center border border-border bg-background font-mono text-sm text-muted-foreground"
                  style={{
                    minHeight,
                    paddingInline: label === 'pad 20' ? primaryPad : quietPad,
                    borderRadius: radius,
                  }}
                >
                  {label}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  )
}