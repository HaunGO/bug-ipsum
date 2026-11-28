const marks = [
  '/mark-studies/01-solid-shield.svg',
  '/mark-studies/02-geometric-disk.svg',
  '/mark-studies/03-specimen-pin.svg',
  '/mark-studies/04-split-oval.svg',
  '/mark-studies/05-bold-block.svg',
  '/mark-studies/06-corner-mount.svg',
  '/mark-studies/07-elytra-pair.svg',
  '/mark-studies/08-monogram-b.svg',
]

export function MarkStudiesGallery() {
  return (
    <div className="min-h-screen bg-[#eeeeea] px-6 py-16 sm:px-12 sm:py-20">
      <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-14 sm:grid-cols-4 sm:gap-16 lg:gap-20">
        {marks.map((src) => (
          <li key={src} className="flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="h-24 w-24 object-contain sm:h-28 sm:w-28" />
          </li>
        ))}
      </ul>
    </div>
  )
}