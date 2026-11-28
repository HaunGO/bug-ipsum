const marks = [
  '/logo-marks/01-beetle-solid.svg',
  '/logo-marks/02-beetle-outline.svg',
  '/logo-marks/03-wordmark-only.svg',
  '/logo-marks/04-wordmark-specimen-dot.svg',
  '/logo-marks/05-engraving-dorsal.svg',
  '/logo-marks/06-engraving-wing-case.svg',
]

export function LogoMarkGallery() {
  return (
    <div className="min-h-screen bg-[#eeeeea] px-8 py-16 sm:px-14 sm:py-20">
      <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-16 sm:grid-cols-2 sm:gap-20 lg:gap-24">
        {marks.map((src) => (
          <li key={src} className="flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="h-auto w-full max-w-[min(100%,22rem)] object-contain" />
          </li>
        ))}
      </ul>
    </div>
  )
}