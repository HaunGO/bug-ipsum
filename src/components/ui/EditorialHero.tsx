import Link from 'next/link'

import { bugImages } from '@/lib/bug-images'
import { filenameToLabel } from '@/lib/specimen-labels'
import { Button } from '@/components/ui/button'

const HERO_INDEX = 10

export function EditorialHero() {
  const file = bugImages[HERO_INDEX]
  const name = filenameToLabel(file)

  return (
    <section className="mx-auto grid max-w-[1440px] items-start gap-10 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,776px)] lg:gap-8 lg:px-14 lg:pb-16 lg:pt-8">
      <div className="max-w-[40rem]">
        <div className="flex items-center gap-6">
          <p className="font-mono text-sm uppercase tracking-[0.14em]">No. 010</p>
          <span aria-hidden className="h-px w-40 bg-border" />
        </div>
        <h1 className="mt-8 font-editorial text-[clamp(3.4rem,8vw,8.25rem)] leading-[0.77] tracking-[-0.028em] text-foreground">
          Beautiful
          <br />
          bug photos
          <br />
          <span className="italic">on demand.</span>
        </h1>
        <p className="mt-8 max-w-[34rem] font-text text-2xl leading-7 text-foreground">
          A simple, flexible API for placeholder images featuring real insect photography. Perfect for
          prototypes, demos, design mockups and more.
        </p>
        <div className="mt-8 flex flex-wrap gap-6">
          <Button asChild className="min-h-[55px] bg-foreground px-6 text-background hover:bg-foreground/90">
            <Link href="/api/640/640?image=10">Build a URL →</Link>
          </Button>
          <Button asChild variant="outline" className="min-h-[55px] px-6">
            <Link href="/contact-sheet">View Examples</Link>
          </Button>
        </div>
        <p className="mt-8 font-mono text-[10.5px] uppercase tracking-[0.14em]">
          Free to use&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;No API key&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;High-quality photos
        </p>
      </div>

      <figure>
        <img
          src={`/images/bugs/only/${file}`}
          alt={name}
          className="aspect-[776/624] w-full object-cover"
        />
        <figcaption className="mt-4 flex flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em]">Photograph no. 010</p>
            <p className="font-editorial text-[2.15rem] italic leading-none tracking-[-0.025em]">{name}</p>
          </div>
          <dl className="space-y-1 font-mono text-sm sm:min-w-72">
            <div className="flex justify-between gap-6">
              <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Source</dt>
              <dd>BugIpsum collection</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Original</dt>
              <dd>4032 × 3024 · JPEG</dd>
            </div>
          </dl>
        </figcaption>
      </figure>
    </section>
  )
}
