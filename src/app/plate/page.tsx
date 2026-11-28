import type { Metadata } from 'next'

import { PlateHome } from '@/components/plate/PlateHome'

export const metadata: Metadata = {
  title: 'Bug Ipsum — a plate',
  description:
    'An alternate homepage: real insect photography, a simple API, and the specimen plate for image 010.',
}

export default function PlatePage() {
  return <PlateHome />
}
