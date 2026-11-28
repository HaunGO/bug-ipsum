'use client'

import { usePathname } from 'next/navigation'

import { Footer } from '@/components/ui/Footer'
import { Navigation } from '@/components/ui/Navigation'

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const home = usePathname() === '/'

  return (
    <>
      {home ? null : <Navigation />}
      <main>{children}</main>
      <Footer />
    </>
  )
}
