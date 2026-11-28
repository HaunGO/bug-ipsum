import Link from 'next/link'
import { Bug } from 'lucide-react'

import { cn } from '@/lib/utils'

const presets = {
  nav: {
    mark: 22,
    gap: 'gap-4',
    text: 'font-display text-[1.625rem] font-semibold leading-8 tracking-[-0.035em]',
    stroke: 2,
  },
  footer: {
    mark: 22,
    gap: 'gap-3.5',
    text: 'font-display text-[1.7rem] font-semibold leading-none tracking-[-0.035em]',
    stroke: 2,
  },
  plate: {
    mark: 28,
    gap: 'gap-3',
    text: 'font-display text-[2rem] font-bold leading-none tracking-[-0.03em]',
    stroke: 2.25,
  },
} as const

export function Wordmark({
  className,
  size = 'nav',
  showRule = false,
  href = '/',
}: {
  className?: string
  size?: keyof typeof presets
  showRule?: boolean
  href?: string
}) {
  const { mark, gap, text, stroke } = presets[size]

  return (
    <Link href={href} className={cn('inline-flex items-center text-foreground', gap, className)}>
      <Bug aria-hidden strokeWidth={stroke} style={{ width: mark, height: mark }} className="shrink-0" />
      <span className={text}>
        Bug<span className="italic"> Ipsum</span>
      </span>
      {showRule ? (
        <span aria-hidden className="ml-1 hidden h-8 w-px shrink-0 bg-current opacity-30 sm:block" />
      ) : null}
    </Link>
  )
}