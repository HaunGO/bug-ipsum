'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { SPECIMEN_COUNT, bugImages } from '@/lib/bug-images'
import { filenameToLabel } from '@/lib/specimen-labels'
import { Button } from '@/components/ui/button'
import { Navigation } from '@/components/ui/Navigation'

function randomCatalogIndex() {
  const limit = Math.floor(0x100000000 / SPECIMEN_COUNT) * SPECIMEN_COUNT
  const buf = new Uint32Array(1)
  let value = 0
  do {
    crypto.getRandomValues(buf)
    value = buf[0]
  } while (value >= limit)
  return value % SPECIMEN_COUNT
}

const photoCornerPositions = [
  'left-0 top-0',
  'right-0 top-0 rotate-90',
  'bottom-0 right-0 rotate-180',
  'bottom-0 left-0 -rotate-90',
]

function PhotoCorners() {
  return (
    <>
      {photoCornerPositions.map((position) => (
        <svg
          key={position}
          viewBox="0 0 84 84"
          aria-hidden
          className={`pointer-events-none absolute z-10 origin-center text-foreground size-[4.75rem] ${position}`}
        >
          <path fill="currentColor" d="M0 24 A24 24 0 0 1 24 0 L80 0 A140 140 0 0 1 0 80 Z" />
        </svg>
      ))}
    </>
  )
}

export function EditorialHero() {
  const [index, setIndex] = useState<number | null>(null)

  useEffect(() => {
    setIndex(randomCatalogIndex())
  }, [])

  const file = index === null ? null : bugImages[index]
  const plate = index === null ? '—' : String(index).padStart(3, '0')
  const name = file ? filenameToLabel(file) : ''

  return (
    <section className="flex h-[100vh] flex-col overflow-hidden">
      <Navigation />
      <div className="mx-auto grid min-h-0 w-full max-w-[1440px] flex-1 grid-rows-[auto_minmax(0,1fr)] gap-10 px-6 py-12 lg:grid-cols-[minmax(22rem,1fr)_minmax(0,776px)] lg:grid-rows-1 lg:gap-8 lg:px-14 lg:pb-16 lg:pt-8">
      <div className="max-w-[40rem] min-h-0">
        <div className="flex items-center gap-6">
          <p className="font-mono text-sm uppercase tracking-[0.14em]">No. {plate}</p>
          <span aria-hidden className="h-px w-40 bg-border" />
        </div>
        <h1 className="mt-8 font-editorial text-foreground">
          <span className="block font-normal leading-[0.76] tracking-[-0.045em] text-[6.75rem] sm:text-[8.5rem] md:text-[10rem] lg:text-[7.5rem] xl:text-[8.5rem] min-[1440px]:text-[11rem]">
            Bugs
          </span>
          <span className="mt-2 block font-normal italic leading-[0.9] tracking-[-0.028em] text-[2.25rem] sm:text-[3rem] lg:text-[3.25rem] xl:text-[3.75rem] min-[1440px]:text-[4.25rem]">
            on demand.
          </span>
        </h1>
        <p className="mt-8 max-w-[34rem] font-text text-2xl leading-7 text-foreground">
          A simple, flexible API for placeholder images featuring real insect photography. Perfect for
          prototypes, demos, design mockups and more.
        </p>
        <div className="mt-8 flex flex-wrap gap-6">
          <Button asChild className="min-h-[55px] bg-foreground px-6 text-background hover:bg-foreground/90">
            <Link href={index === null ? '/api/640/640' : `/api/640/640?image=${index}`}>Build a URL →</Link>
          </Button>
          <Button asChild variant="outline" className="min-h-[55px] px-6">
            <Link href="/contact-sheet">View Examples</Link>
          </Button>
        </div>
        <p className="mt-8 font-mono text-[10.5px] uppercase tracking-[0.14em]">
          Free to use&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;No API key&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;High-quality photos
        </p>
      </div>

      <figure className="flex h-full min-h-0 flex-col">
        <div className="relative min-h-0 flex-1">
          {file ? (
            <img
              src={`/images/bugs/only/${file}`}
              alt={name}
              className="h-full min-h-0 w-full object-cover lg:absolute lg:inset-5 lg:h-[calc(100%-2.5rem)] lg:w-[calc(100%-2.5rem)]"
            />
          ) : (
            <div className="h-full min-h-0 w-full bg-muted lg:absolute lg:inset-5 lg:h-[calc(100%-2.5rem)] lg:w-[calc(100%-2.5rem)]" />
          )}
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <PhotoCorners />
          </div>
        </div>
        <figcaption className="mt-4 flex shrink-0 flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em]">Photograph no. {plate}</p>
            <p className="font-editorial text-[2.15rem] italic leading-none tracking-[-0.025em]">{name || '—'}</p>
          </div>
          <dl className="space-y-1 font-mono text-sm sm:min-w-72">
            <div className="flex justify-between gap-6">
              <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Source</dt>
              <dd>BugIpsum collection</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Original</dt>
              <dd>{index === null ? 'JPEG' : `?image=${index} · JPEG`}</dd>
            </div>
          </dl>
        </figcaption>
      </figure>
      </div>
    </section>
  )
}
