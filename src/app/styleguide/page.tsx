import type { Metadata } from 'next'
import { StyleGuideShell } from '@/components/styleguide/StyleGuideShell'
import { IntroSection } from '@/components/styleguide/sections/IntroSection'
import { ColorsSection } from '@/components/styleguide/sections/ColorsSection'
import { TypographySection } from '@/components/styleguide/sections/TypographySection'
import { SpacingSection } from '@/components/styleguide/sections/SpacingSection'
import { BordersSection } from '@/components/styleguide/sections/BordersSection'
import { ButtonsSection } from '@/components/styleguide/sections/ButtonsSection'
import { FormsSection } from '@/components/styleguide/sections/FormsSection'
import { ComponentsSection } from '@/components/styleguide/sections/ComponentsSection'
import { AuditSection } from '@/components/styleguide/sections/AuditSection'

export const metadata: Metadata = {
  title: 'Style guide — Bug Ipsum',
  description: 'Living reference for color, type, spacing, and shadcn/ui components.',
}

export default function StyleGuidePage() {
  return (
    <StyleGuideShell>
      <IntroSection />
      <ColorsSection />
      <TypographySection />
      <SpacingSection />
      <BordersSection />
      <ButtonsSection />
      <FormsSection />
      <ComponentsSection />
      <AuditSection />
    </StyleGuideShell>
  )
}