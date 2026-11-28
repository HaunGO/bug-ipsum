'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { STYLEGUIDE_SECTIONS } from './styleguide-sections'
import { StyleGuideHero } from './StyleGuideHero'
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
      { rootMargin: '-15% 0px -60% 0px', threshold: [0, 0.2, 0.45] }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background pb-24">
      <StyleGuideHero />

      <div className="mx-auto max-w-[1440px] px-6 lg:px-14">
        <div className="lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-x-14 xl:grid-cols-[14rem_minmax(0,1fr)] xl:gap-x-20">
          <aside className="mb-8 lg:mb-0 lg:pt-12">
            <nav aria-label="Style guide sections" className="lg:sticky lg:top-28">
              <p className="specimen-label">Index</p>
              <p className="mt-2 hidden font-mono text-[10px] leading-relaxed text-muted-foreground lg:block">
                {STYLEGUIDE_SECTIONS.length} sections · scroll-linked
              </p>
              <ul className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0">
                {STYLEGUIDE_SECTIONS.map(({ id, label }, index) => (
                  <li key={id} className="shrink-0 lg:shrink">
                    <a
                      href={`#${id}`}
                      className={cn(
                        'group flex items-baseline gap-2 whitespace-nowrap rounded-plate border border-transparent px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors lg:whitespace-normal lg:border-0 lg:px-0 lg:py-2',
                        activeId === id
                          ? 'border-border bg-muted text-foreground lg:border-l-2 lg:border-l-accent lg:bg-transparent lg:pl-3'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      <span
                        className={cn(
                          'hidden text-[10px] tabular-nums lg:inline',
                          activeId === id ? 'text-accent' : 'text-muted-foreground/70'
                        )}
                        aria-hidden
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="styleguide-panel min-w-0 border-t-0 px-5 py-10 sm:px-8 sm:py-12 lg:max-w-4xl lg:border-t lg:px-10 lg:py-14">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}