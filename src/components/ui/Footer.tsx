import Link from 'next/link'

import { mainSiteNav, styleGuideNavItem } from '@/lib/site-nav'
import { Wordmark } from '@/components/ui/Wordmark'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:h-24 lg:px-14 lg:py-0">
        <div className="flex items-center gap-7">
          <Wordmark size="footer" />
          <span aria-hidden className="hidden h-8 w-px bg-border sm:block" />
          <p className="hidden font-mono text-xs uppercase tracking-[0.14em] sm:block">A buggy little API.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {mainSiteNav.map((item) => (
            <Link key={item.label} href={item.href} className="font-text text-base hover:opacity-70">
              {item.label}
            </Link>
          ))}
          <Link href={styleGuideNavItem.href} className="font-text text-base hover:opacity-70">
            {styleGuideNavItem.label}
          </Link>
        </nav>
      </div>
    </footer>
  )
}