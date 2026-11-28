import { Camera, Layers, SlidersHorizontal, Zap } from 'lucide-react'

const features = [
  {
    title: 'Real Photography',
    description: 'Original insect photos, not generated images.',
    icon: Camera,
  },
  {
    title: 'Full Control',
    description: 'Customize size, specimen, saturation, contrast, blur and tint.',
    icon: SlidersHorizontal,
  },
  {
    title: 'Easy to Integrate',
    description: 'A simple, consistent API designed for developers and designers.',
    icon: Layers,
  },
  {
    title: 'Fast & Reliable',
    description: 'Lightweight, cache-friendly and ready for any project.',
    icon: Zap,
  },
]

export function FeatureStrip() {
  return (
    <section className="border-y border-border">
      <ul className="mx-auto grid max-w-[1360px] sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
        {features.map((feature) => (
          <li key={feature.title} className="flex flex-col items-start px-6 py-8 text-left lg:px-8 lg:py-10">
            <feature.icon aria-hidden className="size-11 text-foreground" strokeWidth={1.5} />
            <h3 className="mt-3 font-editorial text-[2rem] leading-[1.15]">{feature.title}</h3>
            <p className="mt-2 font-text text-[1.15rem] leading-[1.15]">{feature.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
