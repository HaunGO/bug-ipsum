import type { CSSProperties, ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'

export function ThemePlate({
  title,
  vars,
  children,
  className,
}: {
  title: string
  vars?: CSSProperties
  children: ReactNode
  className?: string
}) {
  return (
    <Card className={`bg-background text-foreground ${className ?? ''}`} style={vars}>
      <CardContent className="p-6">
        <p className="specimen-label">{title}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">{children}</div>
      </CardContent>
    </Card>
  )
}