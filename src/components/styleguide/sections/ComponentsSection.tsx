import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Wordmark } from '@/components/ui/Wordmark'
import { Section } from '../Section'

const INSTALLED = [
  {
    name: 'Button',
    path: '@/components/ui/button',
    parts: 'variants: default, quiet, outline, ghost, link · sizes: default, sm, icon',
  },
  {
    name: 'Input',
    path: '@/components/ui/input',
    parts: 'text, file, disabled, focus ring',
  },
  {
    name: 'Card',
    path: '@/components/ui/card',
    parts: 'CardHeader, CardTitle, CardDescription, CardContent, CardFooter',
  },
] as const

export function ComponentsSection() {
  return (
    <Section
      id="components"
      kicker="07 — Library"
      title="Installed UI components"
      lede="shadcn/ui new-york style (components.json). Additions via npx shadcn@latest add — not bespoke duplicates."
    >
      <div className="space-y-10">
        <div className="motion-plate-settle flex flex-wrap items-center justify-between gap-6 rounded-plate border border-border bg-muted/20 p-6">
          <div>
            <p className="specimen-label">Product lockup</p>
            <Wordmark size="nav" className="mt-4" />
          </div>
          <Wordmark size="footer" showRule />
        </div>

        <Card className="bg-background">
          <CardContent className="p-0">
            <ul className="divide-y divide-border border-y border-border">
              {INSTALLED.map((row) => (
                <li key={row.name} className="grid gap-2 px-5 py-4 font-mono text-xs sm:grid-cols-[6rem_1fr]">
                  <span className="text-sm text-foreground">{row.name}</span>
                  <div>
                    <p className="text-muted-foreground">{row.path}</p>
                    <p className="mt-1 text-muted-foreground">{row.parts}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div>
          <h3 className="font-mono text-sm text-foreground">Card anatomy</h3>
          <Card className="mt-4 max-w-md bg-card text-card-foreground">
            <CardHeader>
              <CardTitle>Card title</CardTitle>
              <CardDescription>Optional description in muted foreground.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">CardContent — padded below header.</CardContent>
            <CardFooter className="font-mono text-xs text-muted-foreground">CardFooter</CardFooter>
          </Card>
        </div>
      </div>
    </Section>
  )
}