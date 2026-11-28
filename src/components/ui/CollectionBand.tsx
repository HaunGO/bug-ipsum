import Link from 'next/link'

import { SPECIMEN_COUNT, bugImages } from '@/lib/bug-images'
import { filenameToLabel } from '@/lib/specimen-labels'
import { Button } from '@/components/ui/button'

const TILES = [10, 25, 6, 14]

function plate(index: number) {
  return String(index).padStart(3, '0')
}

export function CollectionBand() {
  const last = SPECIMEN_COUNT - 1

  return (
    <section id="collection" className="mx-auto grid max-w-[1440px] gap-12 px-6 py-16 lg:grid-cols-[9rem_20rem_minmax(0,1fr)] lg:items-start lg:gap-8 lg:px-14 lg:py-20">
      <div>
        <p className="font-mono text-[11px] uppercase leading-[18px] tracking-[0.14em]">
          The
          <br />
          archive
        </p>
        <p className="mt-4 font-editorial text-[6.25rem] italic leading-none tracking-[-0.025em]">{SPECIMEN_COUNT}</p>
        <span aria-hidden className="mt-4 block h-px w-24 bg-border" />
        <p className="mt-4 font-mono text-[10px] uppercase leading-5 tracking-[0.14em]">
          Real photos
          <br />
          Index 0—{last}
          <br />
          BugIpsum API
        </p>
      </div>

      <div className="max-w-sm">
        <div className="flex items-center gap-4">
          <p className="font-mono text-[13px] uppercase tracking-[0.14em]">The collection</p>
          <span aria-hidden className="h-px w-24 bg-border" />
        </div>
        <h2 className="mt-4 font-editorial text-[clamp(2.6rem,5vw,4.125rem)] leading-[0.85] tracking-[-0.025em]">
          A diverse
          <br />
          collection
          <br />
          <span className="italic">of bugs.</span>
        </h2>
        <p className="mt-5 font-text text-[1.3rem] leading-6">
          Beetles, bees, wasps, flies and more. Real specimens, real photography, endlessly useful.
        </p>
        <Button asChild variant="outline" className="mt-6">
          <Link href="/contact-sheet">Browse the Gallery ↗</Link>
        </Button>
      </div>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {TILES.map((index) => {
          const file = bugImages[index]
          const label = filenameToLabel(file)
          return (
            <li key={file}>
              <img
                src={`/images/bugs/only/${file}`}
                alt={label}
                className="aspect-[204/314] w-full rounded-[16px] object-cover"
              />
              <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.06em]">
                {plate(index)}&nbsp;&nbsp;/&nbsp;&nbsp;{label}
              </p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
