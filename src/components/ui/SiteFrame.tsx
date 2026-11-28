'use client'

import { usePathname } from 'next/navigation'

import { Footer } from '@/components/ui/Footer'
import { Navigation } from '@/components/ui/Navigation'

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const home = pathname === '/'
  const standalone =
    pathname === '/mark-studies' || pathname === '/plate' || pathname === '/logo-marks'

  if (standalone) return <main>{children}</main>

  return (
    <>
      {home ? null : <Navigation />}
      <main>{children}</main>
      <Footer />
    </>
  )
}
