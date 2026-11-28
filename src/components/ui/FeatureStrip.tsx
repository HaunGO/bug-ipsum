function RealPhotographyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-11 text-foreground" aria-hidden>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4zm1.003 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
      />
    </svg>
  )
}

function FullControlIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-11 text-foreground" aria-hidden fill="currentColor">
      <rect x="2" y="3.8" width="20" height="2.4" rx="1.2" />
      <circle cx="14" cy="5" r="3.15" />
      <rect x="2" y="10.8" width="20" height="2.4" rx="1.2" />
      <circle cx="8" cy="12" r="3.15" />
      <rect x="2" y="17.8" width="20" height="2.4" rx="1.2" />
      <circle cx="16" cy="19" r="3.15" />
    </svg>
  )
}

function EasyToIntegrateIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-11 text-foreground" aria-hidden fill="currentColor">
      <path d="M12 .8 21.6 4.3 12 7.8 2.4 4.3Z" />
      <path d="M12 8.5 21.6 12 12 15.5 2.4 12Z" />
      <path d="M12 16.2 21.6 19.7 12 23.2 2.4 19.7Z" />
    </svg>
  )
}

function FastAndReliableIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-11 text-foreground" aria-hidden>
      <path
        fill="currentColor"
        d="M15.914 4a1.5 1.5 0 0 0-2.474-1.561l-9 9A1.5 1.5 0 0 0 5.5 14h4.002a.5.5 0 0 1 .471.666L8.086 20a1.5 1.5 0 0 0 2.475 1.56l9-9A1.5 1.5 0 0 0 18.5 10h-3.997a.5.5 0 0 1-.472-.667z"
      />
    </svg>
  )
}

const features = [
  {
    title: 'Real Photography',
    description: 'Original insect photos, not generated images.',
    icon: RealPhotographyIcon,
  },
  {
    title: 'Full Control',
    description: 'Customize size, specimen, saturation, contrast, blur and tint.',
    icon: FullControlIcon,
  },
  {
    title: 'Easy to Integrate',
    description: 'A simple, consistent API designed for developers and designers.',
    icon: EasyToIntegrateIcon,
  },
  {
    title: 'Fast & Reliable',
    description: 'Lightweight, cache-friendly and ready for any project.',
    icon: FastAndReliableIcon,
  },
]

export function FeatureStrip() {
  return (
    <section className="border-y border-border">
      <ul className="mx-auto grid max-w-[1360px] sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
        {features.map((feature) => (
          <li key={feature.title} className="flex flex-col items-start px-6 py-8 text-left lg:px-8 lg:py-10">
            <feature.icon />
            <h3 className="mt-3 font-editorial text-[2rem] leading-[1.15]">{feature.title}</h3>
            <p className="mt-2 font-text text-[1.15rem] leading-[1.15]">{feature.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
