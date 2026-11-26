import { Button } from '@/components/ui/button'
import { cabinetThemeVars, plateThemeVars } from '@/lib/semantic-theme'
import { Section } from '../Section'
import { ThemePlate } from '../ThemePlate'
import { AuditNote } from '../AuditNote'

const VARIANTS = ['default', 'quiet', 'outline', 'ghost', 'link'] as const
const SIZES = ['default', 'sm', 'icon'] as const

export function ButtonsSection() {
  return (
    <Section
      id="buttons"
      kicker="05 — Controls"
      title="Buttons"
      lede={
        <>
          shadcn <code className="font-mono text-sm text-foreground">Button</code>. Product uses{' '}
          <code className="font-mono text-sm">default</code> and <code className="font-mono text-sm">quiet</code>; other
          variants ship with shadcn for completeness.
        </>
      }
    >
      <div className="space-y-10">
        <div>
          <p className="font-mono text-xs text-muted-foreground">Variants</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {VARIANTS.map((variant) => (
              <Button key={variant} type="button" variant={variant}>
                {variant}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-xs text-muted-foreground">Sizes</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {SIZES.map((size) => (
              <Button key={size} type="button" size={size} aria-label={size === 'icon' ? 'Icon size' : undefined}>
                {size === 'icon' ? '·' : size}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-xs text-muted-foreground">States</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button type="button">Default</Button>
            <Button type="button" disabled>
              Disabled
            </Button>
            <Button type="button" variant="quiet" disabled>
              Quiet disabled
            </Button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <ThemePlate title="Plate" vars={plateThemeVars}>
            <Button type="button">Build a URL</Button>
            <Button type="button" variant="quiet">
              Quiet
            </Button>
          </ThemePlate>
          <ThemePlate title="Cabinet" vars={cabinetThemeVars}>
            <Button type="button">Build a URL</Button>
            <Button type="button" variant="quiet">
              Quiet
            </Button>
          </ThemePlate>
        </div>

        <AuditNote title="Unused variants">
          outline, ghost, and link are not used on marketing pages yet. Consider pruning or documenting before wider
          adoption.
        </AuditNote>
      </div>
    </Section>
  )
}