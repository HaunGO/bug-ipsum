import Link from 'next/link'

import { Wordmark } from '@/components/ui/Wordmark'
import { SPECIMEN_COUNT, bugImages } from '@/lib/bug-images'
import { filenameToLabel } from '@/lib/specimen-labels'

const SPECIMEN = 10
const specimenFile = bugImages[SPECIMEN]
const plateNo = String(SPECIMEN).padStart(3, '0')
const specimenName = filenameToLabel(specimenFile)

const nav = [
  { href: `/api/640/480?image=${SPECIMEN}`, label: 'API' },
  { href: '/styleguide', label: 'Docs' },
  { href: '/contact-sheet', label: 'Examples' },
  { href: '/contact-sheet', label: 'Gallery' },
  { href: '/styleguide', label: 'Style Guide' },
]

const definitions = [
  {
    term: 'bug',
    pronounce: '/bʌɡ/ · noun',
    text: 'A small insect or other crawling creature; also, a defect in a computer program.',
  },
  {
    term: 'ipsum',
    pronounce: 'Latin · pronoun',
    text: 'Itself. An emphatic form of the Latin ipse, meaning self.',
  },
  {
    term: 'insect',
    pronounce: '/ˈɪn.sekt/ · noun',
    text: 'A six-legged arthropod with a head, thorax and abdomen.',
  },
  {
    term: 'lorem',
    pronounce: 'Latin · word fragment',
    text: 'Derived from dolorem, meaning pain or sorrow. Familiar through the traditional typesetting passage.',
  },
  {
    term: 'placeholder',
    pronounce: '/ˈpleɪsˌhoʊl.dər/ · noun',
    text: 'Temporary content occupying the space intended for something else.',
  },
]

export function PlateHome() {
  return (
    <div className="bg-[#f3efe6] text-[#1c1915]">
      <Hero />
      <PlateNav />
      <Essence />
      <Etymology />
      <PlateFooter />
    </div>
  )
}

function Hero() {
  return (
    <section className="mx-auto grid max-w-[1440px] items-end gap-10 px-6 pb-14 pt-8 sm:px-10 lg:grid-cols-[minmax(0,34rem)_minmax(0,1fr)] lg:gap-6 lg:px-14 lg:pb-16 lg:pt-10">
      <div className="max-w-[34rem] pb-2">
        <div className="flex items-center gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em]">Plate no. {plateNo}</p>
          <span aria-hidden className="h-px w-28 bg-[#c9c0b2]" />
        </div>
        <h1 className="mt-5 font-display text-[clamp(4.6rem,8vw,7.4rem)] leading-[0.78] tracking-[-0.035em]">
          Bug <span className="italic">Ipsum</span>
        </h1>
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em]">A buggy little API.</p>
        <p className="mt-7 max-w-[26rem] font-editorial text-[clamp(1.85rem,3vw,2.65rem)] italic leading-[1.05] tracking-[-0.02em]">
          Real insect photography for your next project.
        </p>
        <p className="mt-5 max-w-[28rem] font-text text-[1.05rem] leading-7 text-[#3a342c]">
          A simple, flexible API for placeholder images featuring real bugs, insects and other small
          creatures. Perfect for prototypes, demos, design mockups and creative experiments.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href={`/api/640/480?image=${SPECIMEN}`}
            className="inline-flex min-h-11 items-center rounded-plate bg-[#1c1915] px-5 font-text text-[15px] text-[#f3efe6] hover:bg-[#1c1915]/90"
          >
            Build a URL →
          </Link>
          <Link
            href="/contact-sheet"
            className="inline-flex min-h-11 items-center rounded-plate border border-[#1c1915] px-5 font-text text-[15px] hover:bg-[#1c1915]/5"
          >
            View Examples
          </Link>
        </div>
      </div>

      <div className="relative min-h-[26rem] sm:min-h-[32rem] lg:min-h-[40rem]">
        <WingStudy />
        <img
          src={`/images/bugs/only/${specimenFile}`}
          alt={specimenName}
          className="absolute bottom-0 right-0 z-10 h-[22rem] w-full object-cover object-[center_42%] shadow-[0_18px_40px_rgba(40,28,10,0.08)] sm:h-[26rem] lg:h-[88%] lg:w-[72%]"
        />
        <p className="absolute right-0 top-2 z-20 hidden max-w-[11rem] text-right font-mono text-[10px] uppercase leading-4 tracking-[0.16em] lg:block">
          Fig. 01
          <span className="mt-1 block font-text text-[13px] normal-case tracking-normal">Leaf beetle</span>
          <span className="block font-text text-[12px] italic normal-case tracking-normal text-[#5c5348]">
            (Chrysomelidae)
          </span>
        </p>
        <SpecimenCard />
      </div>
    </section>
  )
}

function SpecimenCard() {
  const rows = [
    ['Format', 'JPEG'],
    ['Dimensions', '640 × 480'],
    ['Collection', `${SPECIMEN} / ${SPECIMEN_COUNT}`],
    ['Subject', 'Beetle'],
  ]

  return (
    <aside className="absolute bottom-4 right-3 z-20 w-[min(15.5rem,calc(100%-1.5rem))] border border-[#d5cbbd] bg-[#f7f3ea] px-4 pb-3 pt-3.5 shadow-[0_16px_36px_rgba(48,36,16,0.1)] sm:bottom-6 sm:right-4">
      <span
        aria-hidden
        className="absolute -right-3 -top-3 size-7 rounded-full border border-[#d5cbbd] bg-[#f4efe4]"
      />
      <p className="font-mono text-[10px] uppercase tracking-[0.16em]">
        Specimen no. <span className="tracking-[0.08em]">{plateNo}</span>
      </p>
      <dl className="mt-3">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-baseline justify-between gap-4 border-t border-[#e4dcd0] py-1.5">
            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6d6458]">{label}</dt>
            <dd className="font-mono text-[12px]">{value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  )
}

function WingStudy() {
  return (
    <svg
      viewBox="0 0 520 360"
      aria-hidden
      className="pointer-events-none absolute left-[-18%] top-[2%] z-0 hidden h-[58%] w-[78%] text-[#1c1915] lg:block"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path strokeWidth="1.35" d="M250 150c-40-70-120-98-190-78-28 8-36 36-16 58 34 38 110 52 176 36 16-4 26-10 30-16" />
        <path strokeWidth="0.7" d="M230 132c-36-28-90-36-140-16M214 150c-40-8-96 2-128 24M196 166c-28 6-64 22-84 40" />
        <path strokeWidth="1.35" d="M246 176c-28 4-90 28-128 70-14 16-4 40 18 48 44 16 112 2 156-36 12-10 16-22 14-32" />
        <path strokeWidth="0.7" d="M230 192c-32 14-72 32-100 34M214 214c-26 16-60 28-84 26M196 234c-18 16-42 26-58 22" />
        <path strokeWidth="0.85" d="M248 154v28M92 96c4 8 2 14-4 18M86 230c6 6 4 12-2 16" />
      </g>
    </svg>
  )
}

function PlateNav() {
  return (
    <header className="border-y border-[#d9d0c2]">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-8 gap-y-4 px-6 py-4 sm:px-10 lg:h-[76px] lg:flex-nowrap lg:px-14 lg:py-0">
        <Wordmark href="/" size="plate" showRule className="text-[#1c1915]" />
        <nav aria-label="Plate" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {nav.map((item) => (
            <Link key={item.label} href={item.href} className="font-text text-[15px] hover:opacity-60">
              {item.label}
            </Link>
          ))}
          <Link
            href={`/api/640/480?image=${SPECIMEN}`}
            className="inline-flex min-h-9 items-center rounded-plate bg-[#1c1915] px-3.5 font-text text-sm text-[#f3efe6] hover:bg-[#1c1915]/90"
          >
            Build a URL →
          </Link>
        </nav>
      </div>
    </header>
  )
}

function Essence() {
  const notes = [
    ['Real photography', 'from the collection.'],
    ['A simple, memorable API', 'for placeholder images.'],
    ['Full control over size,', 'subject, tint and more.'],
  ]

  return (
    <section className="mx-auto max-w-[1100px] px-6 py-20 text-center sm:px-10 lg:py-28">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#6a6156]">The essence of Bug Ipsum</p>
      <h2 className="mt-6 flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2 font-display text-[clamp(3.2rem,7vw,5.6rem)] leading-none tracking-[-0.03em]">
        <span>IMG</span>
        <span className="text-[0.45em] font-text font-normal text-[#8a7f72]">+</span>
        <span className="italic">Bug Ipsum</span>
        <span className="text-[0.45em] font-text font-normal text-[#8a7f72]">+</span>
        <span>DATA</span>
      </h2>
      <ul className="mx-auto mt-10 grid max-w-[920px] gap-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-[#ddd4c6]">
        {notes.map(([title, rest]) => (
          <li key={title} className="px-4 font-mono text-[11px] uppercase leading-5 tracking-[0.14em] text-[#4e463c]">
            {title}
            <span className="mt-1 block">{rest}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Etymology() {
  return (
    <section className="mx-auto grid max-w-[1440px] items-start gap-10 px-6 pb-20 sm:px-10 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12 lg:px-14 lg:pb-28">
      <BeetleEngraving />
      <div>
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#d5cbbd] pb-4">
          <h2 className="font-display text-[clamp(2.6rem,4vw,3.6rem)] italic leading-none tracking-[-0.03em]">
            What’s in a name?
          </h2>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#6a6156]">Etymology & nomenclature</p>
        </div>
        <dl className="mt-2 grid sm:grid-cols-2 lg:grid-cols-6">
          {definitions.map((entry, index) => (
            <div
              key={entry.term}
              className={`border-b border-[#e4dcd0] py-6 pr-6 sm:[&:nth-child(odd)]:pr-8 ${
                index < 2 ? 'lg:col-span-3' : 'lg:col-span-2'
              }`}
            >
              <dt className="font-editorial text-[2.4rem] italic leading-none tracking-[-0.03em]">{entry.term}</dt>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#7a7166]">{entry.pronounce}</p>
              <dd className="mt-3 max-w-[22rem] font-text text-[15px] leading-6 text-[#3a342c]">{entry.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function PlateFooter() {
  return (
    <footer className="relative isolate flex min-h-[168px] items-center justify-center overflow-hidden bg-[#142117] px-6 py-16">
      <img
        src={`/images/bugs/only/${specimenFile}`}
        alt=""
        className="absolute inset-0 -z-10 h-full w-full scale-110 object-cover object-[center_18%] brightness-[0.32] saturate-[0.7]"
      />
      <p className="font-editorial text-[clamp(2rem,4vw,3.15rem)] italic leading-none tracking-[-0.02em] text-[#f4efe4]">
        Temporary content. Real character.
      </p>
    </footer>
  )
}

function BeetleEngraving() {
  return (
    <svg viewBox="0 0 200 300" aria-hidden className="mx-auto w-40 text-[#1c1915] lg:mx-0 lg:w-full">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path strokeWidth="1.15" d="M78 42c-8-16-22-22-34-16M122 42c8-16 22-22 34-16" />
        <path strokeWidth="0.8" d="M70 34c-6-2-10 2-8 6M130 34c6-2 10 2 8 6" />
        <path strokeWidth="1.35" d="M86 52a14 12 0 1 0 28 0a14 12 0 1 0-28 0" />
        <circle cx="93" cy="50" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="107" cy="50" r="2.2" fill="currentColor" stroke="none" />
        <path strokeWidth="1.35" d="M64 78c4-16 18-26 36-26s32 10 36 26c3 12-6 24-16 30-8 4-14 5-20 5s-12-1-20-5c-10-6-19-18-16-30z" />
        <path strokeWidth="1.4" d="M60 108c-2 8-8 14-8 14-8 46 2 110 16 148 8 20 20 30 32 34 12-4 24-14 32-34 14-38 24-102 16-148 0 0-6-6-8-14-8-4-24-8-40-8s-32 4-40 8z" />
        <path strokeWidth="1.15" d="M100 102v186" />
        <g strokeWidth="0.7">
          <path d="M78 128h16M122 128h-16M76 150c8 2 12 2 18 0M124 150c-8 2-12 2-18 0M74 174c10 3 14 3 20 0M126 174c-10 3-14 3-20 0M76 198c10 3 14 3 18 0M124 198c-10 3-14 3-18 0M80 222c8 2 12 2 16 0M120 222c-8 2-12 2-16 0M84 246c6 2 8 2 12 0M116 246c-6 2-8 2-12 0" />
          <path d="M82 136c.4 2 .2 3-.4 3M90 138c.4 2 .2 3-.4 3M118 136c.4 2 .2 3-.4 3M110 138c.4 2 .2 3-.4 3M80 160c.4 2 .2 3-.4 3M92 164c.4 2 .2 3-.4 3M120 160c.4 2 .2 3-.4 3M108 164c.4 2 .2 3-.4 3" />
        </g>
        <path strokeWidth="1.2" d="M72 90c-16 2-30-2-40-12" />
        <path strokeWidth="1.2" d="M128 90c16 2 30-2 40-12" />
        <path strokeWidth="1.2" d="M62 124c-22 8-38 10-50 2" />
        <path strokeWidth="1.2" d="M138 124c22 8 38 10 50 2" />
        <path strokeWidth="1.2" d="M64 168c-20 14-34 26-42 24" />
        <path strokeWidth="1.2" d="M136 168c20 14 34 26 42 24" />
        <path strokeWidth="0.9" d="M48 82l-8 10 8 6M152 82l8 10-8 6M32 132l-10 8 8 8M168 132l10 8-8 8M38 186l-8 12 10 6M162 186l8 12-10 6" />
      </g>
    </svg>
  )
}
