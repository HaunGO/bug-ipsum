import { labProofs } from '@/lib/lab-proofs';
import { SPECIMEN_COUNT } from '@/lib/bug-images';
import { LabProofSection } from './LabProofSection';

const REFERENCE: { term: string; detail: string }[] = [
  { term: '/api/{width}/{height}', detail: 'Image at that size, 1–5000 px per side.' },
  { term: '/api', detail: 'A random bug at 300 × 300.' },
  { term: `image=0–${SPECIMEN_COUNT - 1}`, detail: 'A specific specimen. Leave it out for a random bug on every load.' },
  { term: 'saturation=1–9', detail: 'Colour intensity. 5 is natural.' },
  { term: 'blur=1–9', detail: 'Softness. 1 is a slight haze.' },
  { term: 'contrast=1–9', detail: 'Tonal punch. 5 is natural.' },
  { term: 'tint={hex}', detail: '3- or 6-digit hex colour wash; # optional.' },
];

export function LabProofs() {
  return (
    <section id="proofs" aria-labelledby="proofs-title" className="section-shell py-20 lg:py-28">
      <header className="mb-14 max-w-2xl lg:mb-20">
        <p className="specimen-label">02 — Lab proofs</p>
        <h2 id="proofs-title" className="mt-2 font-display text-5xl font-normal tracking-tight sm:text-6xl">
          Every parameter, proven
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Each plate is a live request to the API. Select one to open its exact URL.
        </p>
      </header>

      <div className="space-y-16 lg:space-y-24">
        {labProofs.map((proof, index) => (
          <LabProofSection key={proof.id} proof={proof} number={`2.${index + 1}`} />
        ))}
      </div>

      <div className="mt-20 grid gap-6 rounded-plate bg-raised p-6 sm:p-8 lg:mt-28 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-3">
          <h3 className="font-display text-3xl font-normal">Quick reference</h3>
          <p className="mt-3 text-muted">
            Combine anything with <code className="text-ink">&amp;</code>. Output is JPEG.
          </p>
        </div>
        <div className="lg:col-span-9">
          <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {REFERENCE.map(({ term, detail }) => (
              <div key={term}>
                <dt>
                  <code className="font-mono text-sm text-accent">{term}</code>
                </dt>
                <dd className="mt-0.5 text-muted">{detail}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 break-all font-mono text-sm">
            <span className="text-muted">e.g. </span>
            <a href="/api/800/600?image=3&saturation=7&contrast=6&tint=ff6b6b" className="underline decoration-line underline-offset-4 hover:decoration-current">
              /api/800/600?image=3&amp;saturation=7&amp;contrast=6&amp;tint=ff6b6b
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
