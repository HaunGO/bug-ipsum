import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { dimensionPx } from '@/lib/styleguide-tokens'
import { Section } from '../Section'
import { AuditNote } from '../AuditNote'

export function BordersSection() {
  const radius = dimensionPx('radius-plate')
  const borderW = dimensionPx('button-border')

  return (
    <Section
      id="borders"
      kicker="04 — Shape"
      title="Borders, radii, and shadows"
      lede="Specimen plates use 2px radius and 1px rules. No elevation shadow scale — focus uses rings and a bespoke range-thumb halo."
    >
      <div className="space-y-10">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="bg-background">
            <CardContent className="p-5 font-mono text-xs">
              <p className="specimen-label">Radius</p>
              <p className="mt-2 text-sm text-foreground">
                --radius-plate · {radius}px · rounded-plate
              </p>
              <p className="mt-2 text-muted-foreground">
                shadcn rounded-lg/md/sm all resolve to the same 2px via --radius.
              </p>
              <div
                className="mt-4 h-16 w-full border border-border bg-card"
                style={{ borderRadius: radius }}
              />
            </CardContent>
          </Card>
          <Card className="bg-background">
            <CardContent className="p-5 font-mono text-xs">
              <p className="specimen-label">Border</p>
              <p className="mt-2 text-sm text-foreground">
                border-border · --line · {borderW}px
              </p>
              <div className="mt-4 flex gap-3">
                <div className="h-16 flex-1 border border-border bg-card" />
                <div className="h-16 flex-1 border-2 border-border bg-muted" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="font-mono text-sm text-foreground">Shadows</h3>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            No box-shadow elevation tokens (per refresh brief). Focus affordances only:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-muted-foreground">
            <li>
              shadcn controls: <code className="font-mono text-xs">ring-2 ring-ring ring-offset-2 ring-offset-background</code>
            </li>
            <li>
              <code className="font-mono text-xs">.lab-range</code> thumb: 3px raised + 5px focus halo in globals.css
            </li>
          </ul>
          <div className="mt-6">
            <Button type="button" className="pointer-events-none">
              Tab to preview focus ring
            </Button>
          </div>
        </div>

        <AuditNote title="No shadow scale">
          Intentional omission. Do not add drop-shadow utilities without a token decision.
        </AuditNote>
      </div>
    </Section>
  )
}