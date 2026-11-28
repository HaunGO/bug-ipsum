import Link from 'next/link'
import { Bug } from 'lucide-react'

import { cn } from '@/lib/utils'

export function Wordmark({
  className,
  compact = false,
}: {
  className?: string
  /** Footer and other tight rails use the compact scale. */
  compact?: boolean
}) {
  const mark = 22
  return (
    <Link href="/" className={cn('flex items-center gap-4 text-foreground', className)}>
      <Bug aria-hidden strokeWidth={2} style={{ width: mark, height: mark }} className="shrink-0" />
      <span
        className={cn(
          'font-display font-semibold leading-8 tracking-[-0.035em]',
          compact ? 'text-[1.7rem] leading-none' : 'text-[1.625rem]'
        )}
      >
        Bug<span className="italic"> Ipsum</span>
      </span>
    </Link>
  )
}
