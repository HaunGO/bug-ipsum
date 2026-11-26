import { Section } from '../Section'

export function IntroSection() {
  return (
    <Section
      id="intro"
      kicker="Specimen — Style guide"
      title="Plate and cabinet"
      lede={
        <>
          Living reference for Bug Ipsum&apos;s React, Tailwind, and shadcn/ui stack. Values come from{' '}
          <code className="font-mono text-sm text-foreground">globals.css</code>,{' '}
          <code className="font-mono text-sm text-foreground">tailwind.config.ts</code>, and the Figma handoff JSON — not
          hardcoded palettes. Theme follows the site toggle (plate ↔ cabinet via <code className="font-mono text-sm">html.dark</code>
          ).
        </>
      }
    >
      <p className="max-w-xl text-sm text-muted-foreground">
        Installed shadcn: <code className="font-mono text-xs">Button</code>,{' '}
        <code className="font-mono text-xs">Input</code>, <code className="font-mono text-xs">Card</code>. Primitives{' '}
        <code className="font-mono text-xs">paper</code>, <code className="font-mono text-xs">ink</code>,{' '}
        <code className="font-mono text-xs">pin</code> are for Figma import only.
      </p>
    </Section>
  )
}