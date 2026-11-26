'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { STYLEGUIDE_SECTIONS } from './styleguide-sections'
import { cn } from '@/lib/utils'

export function StyleGuideShell({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string>(STYLEGUIDE_SECTIONS[0].id)

  useEffect(() => {
    const ids = STYLEGUIDE_SECTIONS.map((s) => s.id)
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.25, 0.5] }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="section-shell pb-24 pt-8 lg:pt-12">
      <div className="lg:grid lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-x-16 xl:grid-cols-[12rem_minmax(0,1fr)] xl:gap-x-20">
        <aside className="mb-10 lg:mb-0">
          <nav aria-label="Style guide sections" className="lg:sticky lg:top-28">
            <p className="specimen-label hidden lg:block">Contents</p>
            <ul className="mt-0 flex gap-2 overflow-x-auto pb-2 lg:mt-4 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
              {STYLEGUIDE_SECTIONS.map(({ id, label }) => (
                <li key={id} className="shrink-0 lg:shrink">
                  <a
                    href={`#${id}`}
                    className={cn(
                      'block whitespace-nowrap rounded-plate border border-transparent px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] transition-colors lg:whitespace-normal lg:border-0 lg:px-0 lg:py-2',
                      activeId === id
                        ? 'border-border bg-muted text-foreground lg:bg-transparent'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="min-w-0 max-w-3xl">{children}</div>
      </div>
    </div>
  )
}