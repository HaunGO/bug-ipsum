import Link from 'next/link'

import { Card, CardContent } from '@/components/ui/card'
import { Section } from '../Section'

const STACK = [
  { label: 'Framework', value: 'Next.js App Router' },
  { label: 'Styling', value: 'Tailwind + CSS variables' },
  { label: 'Components', value: 'shadcn/ui (new-york)' },
  { label: 'Display type', value: 'Fraunces · Source Serif 4 · Geist Mono' },
] as const

const PRINCIPLES = [
  {
    title: 'Mount board, not museum glass',
    body: 'Light theme reads as an entomological plate — warm paper, pin green accents, hairline rules.',
  },
  {
    title: 'Cabinet depth at night',
    body: 'Dark theme inverts to ink surfaces with muted specimen labels; accent shifts to pin highlight.',
  },
  {
    title: 'Semantics first',
    body: 'Paper and pin primitives exist for Figma import. Production code uses surface, text, line, and accent.',
  },
] as const

export function IntroSection() {
  return (
    <Section
      id="intro"
      kicker="00 — Introduction"
      title="Plate and cabinet"
      lede={
        <>
          This guide is the single source of truth for Bug Ipsum&apos;s refreshed product shell. Values are pulled from{' '}
          <code className="font-mono text-sm text-foreground">globals.css</code>,{' '}
          <code className="font-mono text-sm text-foreground">tailwind.config.ts</code>, and the Figma token JSON —
          then verified in the browser with theme switching (<code className="font-mono text-sm">html.dark</code>).
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="bg-background">
          <CardContent className="p-6">
            <p className="specimen-label">Stack</p>
            <ul className="mt-5 divide-y divide-border border-y border-border">
              {STACK.map((row) => (
                <li key={row.label} className="grid gap-1 py-3 font-mono text-xs sm:grid-cols-[7rem_1fr]">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="text-sm text-foreground">{row.value}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-muted/30">
          <CardContent className="p-6">
            <p className="specimen-label">Installed primitives</p>
            <p className="mt-4 font-text text-sm leading-relaxed text-muted-foreground">
              shadcn: <code className="font-mono text-xs">Button</code>, <code className="font-mono text-xs">Input</code>,{' '}
              <code className="font-mono text-xs">Card</code>. Marketing primitives include{' '}
              <code className="font-mono text-xs">Wordmark</code>, <code className="font-mono text-xs">EditorialHero</code>, and{' '}
              <code className="font-mono text-xs">FeatureStrip</code> on the homepage.
            </p>
            <p className="mt-4 font-text text-sm text-muted-foreground">
              Extend via <code className="font-mono text-xs">npx shadcn@latest add</code> — avoid one-off duplicates.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block font-mono text-xs uppercase tracking-[0.12em] text-accent underline-offset-4 hover:underline"
            >
              Compare on homepage →
            </Link>
          </CardContent>
        </Card>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-3">
        {PRINCIPLES.map((item) => (
          <li key={item.title} className="rounded-plate border border-border bg-background p-5">
            <p className="font-display text-lg leading-snug tracking-[-0.02em] text-foreground">{item.title}</p>
            <p className="mt-3 font-text text-sm leading-relaxed text-muted-foreground">{item.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}