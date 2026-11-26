import { Card, CardContent } from '@/components/ui/card'
import { Section } from '../Section'

const FINDINGS = [
  {
    title: 'Dual Tailwind color APIs',
    detail:
      'Semantic (bg-page, text-ink, border-line) and shadcn (bg-background, text-foreground, border-border) map to the same CSS variables. SEMANTIC_COLOR_TOKENS still lists legacy names; marketing TSX mixes both.',
  },
  {
    title: 'docs/tokens.md drift',
    detail:
      'Still references removed .surface-*, .btn-*, .field-input classes. Living source is this page plus globals.css.',
  },
  {
    title: 'Button variant surface area',
    detail: 'outline, ghost, link installed but unused in product. quiet + default are canonical.',
  },
  {
    title: 'No elevation shadows',
    detail: 'Intentional per refresh brief. Only focus rings and lab-range thumb halo.',
  },
  {
    title: 'lucide-react',
    detail: 'Listed in package.json for shadcn; no icons in ui components yet.',
  },
  {
    title: 'Geist sans on html',
    detail: 'layout.tsx sets --font-sans (Geist) while body uses font-text (Source Serif). Secondary stack.',
  },
  {
    title: 'Radius aliases',
    detail: 'tailwind rounded-lg/md/sm collapse to 2px plate radius — shadcn defaults add little differentiation.',
  },
] as const

export function AuditSection() {
  return (
    <Section
      id="audit"
      kicker="08 — Audit"
      title="System notes"
      lede="Candidates for simplification — not blockers. Use this page to track token and API redundancy."
    >
      <Card className="bg-background">
        <CardContent className="p-0">
          <ul className="divide-y divide-border border-y border-border">
            {FINDINGS.map(({ title, detail }) => (
              <li key={title} className="px-5 py-5">
                <p className="font-mono text-sm text-foreground">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </Section>
  )
}