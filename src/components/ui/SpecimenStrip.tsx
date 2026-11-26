'use client';

import Image from 'next/image';
import { bugImages, SPECIMEN_COUNT } from '@/lib/bug-images';
import { formatPlateNumber, getSpecimenLabel } from '@/lib/specimen-labels';
import { useSpecimen } from './SpecimenContext';

export function SpecimenStrip() {
  const { setSpecimen } = useSpecimen();

  const sendToBuilder = (index: number) => {
    setSpecimen(index);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('builder')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    requestAnimationFrame(() => {
      document
        .querySelector<HTMLInputElement>(`#builder input[name="specimen"][value="${index}"]`)
        ?.focus({ preventScroll: true });
    });
  };

  return (
    <section id="collection" aria-labelledby="collection-title" className="bg-raised">
      <div className="section-shell py-20 lg:py-28">
        <header className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="specimen-label">03 — The collection</p>
            <h2 id="collection-title" className="mt-2 font-display text-5xl font-normal tracking-tight sm:text-6xl">
              {SPECIMEN_COUNT} specimens
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-muted">
            All photographed by me, mostly in my own backyard. Pick one to load it into the Bug Builder.
          </p>
        </header>

        <ul className="grid grid-cols-3 gap-x-2 gap-y-6 sm:grid-cols-4 lg:grid-cols-7 lg:gap-x-3">
          {bugImages.map((filename, index) => {
            const label = getSpecimenLabel(index);
            return (
              <li key={filename}>
                <button
                  type="button"
                  onClick={() => sendToBuilder(index)}
                  className="motion-lift group relative block w-full text-left"
                >
                  <span className="block overflow-hidden rounded-plate bg-sunken">
                    <Image
                      src={`/api/280/350?image=${index}`}
                      alt=""
                      width={280}
                      height={350}
                      unoptimized
                      loading="lazy"
                      className="h-auto w-full"
                    />
                  </span>
                  <span className="mt-2 block font-mono text-xs text-muted">{formatPlateNumber(index)}</span>
                  <span className="block text-sm leading-snug group-hover:underline group-hover:underline-offset-4">
                    {label}
                  </span>
                  <span className="sr-only"> — use in the Bug Builder</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
