import Link from 'next/link'
import { Bug } from 'lucide-react'

import { cn } from '@/lib/utils'

export function Wordmark({
  className,
  mark = 28,
}: {
  className?: string
  mark?: number
}) {
  return (
    <Link href="/" className={cn('flex items-center gap-4 text-foreground', className)}>
      <Bug aria-hidden strokeWidth={1.75} style={{ width: mark, height: mark }} />
      <span className="font-display text-[1.65rem] leading-none tracking-[-0.035em] sm:text-[2.6rem]">
        Bug<span className="italic"> Ipsum</span>
      </span>
    </Link>
  )
}
