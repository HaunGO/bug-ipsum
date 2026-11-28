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
      className={`scroll-mt-28 section-block border-t border-border pt-14 first:border-t-0 first:pt-0 lg:scroll-mt-32 lg:pt-20 first:lg:pt-0 ${className ?? ''}`}
    >
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        {kicker ? <p className="specimen-label">{kicker}</p> : null}
      </div>
      <h2 id={`${id}-title`} className="type-subsection mt-3 tracking-[-0.03em]">
        {title}
      </h2>
      {lede ? (
        <div className="type-lede mt-5 max-w-2xl border-l-2 border-accent/40 pl-5 text-muted-foreground">{lede}</div>
      ) : null}
      <div className="mt-10 lg:mt-12">{children}</div>
    </section>
  )
}