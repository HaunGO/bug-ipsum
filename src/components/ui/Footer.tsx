import Link from 'next/link'

import { siteNav } from '@/lib/site-nav'
import { Wordmark } from '@/components/ui/Wordmark'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:h-24 lg:px-14 lg:py-0">
        <div className="flex items-center gap-7">
          <Wordmark className="[&_span]:text-[1.7rem]" mark={24} />
          <span aria-hidden className="hidden h-8 w-px bg-border sm:block" />
          <p className="hidden font-mono text-xs uppercase tracking-[0.14em] sm:block">A buggy little API.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {siteNav.map((item) => (
            <Link key={item.label} href={item.href} className="font-text text-base hover:opacity-70">
              {item.label}
            </Link>
          ))}
          <a
            href="https://github.com/HaunGO/bug-ipsum"
            aria-label="GitHub"
            className="text-foreground hover:opacity-70"
          >
            <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.32.1-2.75 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 5 0c1.9-1.32 2.74-1.05 2.74-1.05.55 1.43.2 2.49.1 2.75.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.81 0 .27.18.6.69.49A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"
              />
            </svg>
          </a>
          <span aria-label="Bluesky" className="text-foreground" role="img">
            <svg viewBox="0 0 24 21.14" className="size-6" aria-hidden>
              <path
                fill="currentColor"
                d="M5.5 1.4C8.1 3.3 10.9 7.1 12 9.2c1.1-2.1 3.9-5.9 6.5-7.8 2.5-1.8 3.5-1.5 4.1-1.2.7.3.9 1 .9 1.6 0 .6-.3 5.1-.5 5.8-.7 2.5-3.4 3.4-5.8 3.1 3.8.6 7.2 2 2.8 7-4.8 5.4-6.6-1-7.8-4-.2-.5-.4-1.1-.6-1.5-.2.4-.4 1-.6 1.5-1.2 3-3 9.4-7.8 4-4.4-5 1-6.4 2.8-7-2.4.3-5.1-.6-5.8-3.1-.2-.7-.5-5.2-.5-5.8 0-.6.2-1.3.9-1.6.6-.3 1.6-.6 4.1 1.2z"
              />
            </svg>
          </span>
        </nav>
      </div>
    </footer>
  )
}
