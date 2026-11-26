import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  kicker?: string
  title: string
  lede?: ReactNode
  children: ReactNode
  className?: string
}

export function Section({ id, kicker, title, lede, children, className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-28 section-block border-t border-border pt-16 first:border-t-0 first:pt-0 lg:scroll-mt-32 ${className ?? ''}`}
    >
      {kicker ? <p className="specimen-label">{kicker}</p> : null}
      <h2 id={`${id}-title`} className="type-subsection mt-2">
        {title}
      </h2>
      {lede ? <div className="type-lede mt-4 max-w-2xl text-muted-foreground">{lede}</div> : null}
      <div className="mt-10">{children}</div>
    </section>
  )
}