import Link from 'next/link'

import { Button } from '@/components/ui/button'

const EDITION = '2026.11'

export function StyleGuideHero() {
  return (
    <header className="styleguide-hero-band">
      <div className="mx-auto max-w-[1440px] px-6 pb-14 pt-10 lg:px-14 lg:pb-20 lg:pt-16">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Ref. BI·SG·001 · Edition {EDITION}
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Plate ↔ cabinet · live tokens
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)] lg:items-end lg:gap-16">
          <div>
            <h1 className="font-display text-foreground">
              <span className="block text-5xl font-normal leading-[0.92] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                Living
              </span>
              <span className="mt-1 block text-5xl font-normal italic leading-[0.92] tracking-[-0.04em] text-muted-foreground sm:text-6xl lg:text-7xl">
                design system.
              </span>
            </h1>
            <p className="type-lede-hero mt-8 max-w-2xl">
              The cabinet reference for color, typography, spacing, and interface patterns behind{' '}
              <Link href="/" className="text-foreground underline decoration-border underline-offset-4 hover:decoration-accent">
                Bug Ipsum
              </Link>
              . Every specimen on this page binds to{' '}
              <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">globals.css</code> and
              the site theme toggle — not hand-picked hex values.
            </p>
          </div>

          <aside className="styleguide-panel space-y-5 p-6">
            <p className="specimen-label">How to read this</p>
            <ol className="list-decimal space-y-3 pl-4 font-text text-sm leading-relaxed text-muted-foreground marker:font-mono marker:text-xs marker:text-accent">
              <li>Toggle plate and cabinet with the theme control in the header — tokens re-render in place.</li>
              <li>Jump via the section index; specimens update as you scroll.</li>
              <li>Ship from semantics (<code className="font-mono text-xs">bg-background</code>,{' '}
                <code className="font-mono text-xs">text-foreground</code>), not raw primitives.</li>
            </ol>
            <Button asChild variant="outline" className="w-full border-border font-mono text-xs uppercase tracking-[0.12em]">
              <Link href="/contact-sheet">View specimens in the wild →</Link>
            </Button>
          </aside>
        </div>
      </div>
    </header>
  )
}