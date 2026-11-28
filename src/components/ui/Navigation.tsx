import Link from 'next/link'

import { siteNav } from '@/lib/site-nav'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Wordmark } from '@/components/ui/Wordmark'

export function Navigation() {
  return (
    <header className="relative border-b border-border bg-background">
      <div className="absolute right-3 top-2 z-30">
        <ThemeToggle />
      </div>
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-8 gap-y-4 px-6 py-4 pr-28 lg:h-[88px] lg:flex-nowrap lg:py-0 lg:pl-14 lg:pr-32">
        <div className="flex min-w-0 items-center gap-7">
          <Wordmark />
          <span aria-hidden className="hidden h-9 w-px bg-border sm:block" />
          <p className="hidden font-mono text-[13px] uppercase tracking-[0.14em] text-foreground sm:block">
            A buggy little API.
          </p>
        </div>
        <nav aria-label="Main" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {siteNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-text text-base text-foreground hover:opacity-70"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild size="sm" className="bg-foreground text-background hover:bg-foreground/90">
            <Link href="/api/640/640?image=10">Build a URL →</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
