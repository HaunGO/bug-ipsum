import { Input } from '@/components/ui/input'
import { cabinetThemeVars } from '@/lib/semantic-theme'
import { Section } from '../Section'
import { ThemePlate } from '../ThemePlate'
import { AuditNote } from '../AuditNote'

export function FormsSection() {
  return (
    <Section
      id="forms"
      kicker="06 — Forms"
      title="Form controls"
      lede="shadcn Input plus CSS primitive lab-range from Bug Builder (not shadcn)."
    >
      <div className="space-y-10">
        <ThemePlate title="Input — plate">
          <div className="grid w-full max-w-md gap-4">
            <Input type="text" placeholder="800" aria-label="Width" className="max-w-[10rem]" />
            <Input type="text" placeholder="Disabled" disabled aria-label="Disabled example" />
          </div>
        </ThemePlate>

        <ThemePlate title="Input — cabinet preview" vars={cabinetThemeVars}>
          <Input type="text" defaultValue="ff6b6b" aria-label="Tint hex" className="max-w-[10rem]" />
        </ThemePlate>

        <div>
          <h3 className="font-mono text-sm text-foreground">lab-range</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Class <code className="font-mono text-xs">.lab-range</code> in globals.css.{' '}
            <code className="font-mono text-xs">data-off=&quot;true&quot;</code> greys the thumb when an effect is off.
          </p>
          <div className="mt-4 max-w-md space-y-4">
            <label className="block text-sm text-muted-foreground">
              Active
              <input type="range" className="lab-range mt-2" defaultValue={60} min={0} max={100} />
            </label>
            <label className="block text-sm text-muted-foreground">
              Off
              <input type="range" className="lab-range mt-2" data-off="true" defaultValue={40} min={0} max={100} />
            </label>
          </div>
        </div>

        <AuditNote title="No shadcn Label / Select">
          Only Input is installed. Sliders and copied-state URL field remain bespoke markup.
        </AuditNote>
      </div>
    </Section>
  )
}