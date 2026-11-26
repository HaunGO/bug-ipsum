import type { ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'

export function AuditNote({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card className="border-primary/30 bg-muted/40 text-foreground">
      <CardContent className="p-5">
        <p className="specimen-label text-primary">Audit · {title}</p>
        <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
      </CardContent>
    </Card>
  )
}