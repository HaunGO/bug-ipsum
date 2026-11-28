import { CollectionBand } from '@/components/ui/CollectionBand'
import { EditorialHero } from '@/components/ui/EditorialHero'
import { FeatureStrip } from '@/components/ui/FeatureStrip'

export default function HomePage() {
  return (
    <>
      <EditorialHero />
      <CollectionBand />
      <FeatureStrip />
    </>
  )
}
