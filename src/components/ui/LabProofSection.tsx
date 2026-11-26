import type { LabProof } from '@/lib/lab-proofs';
import { ProofPlate } from './ProofPlate';

interface LabProofSectionProps {
  proof: LabProof;
  number: string;
}

export function LabProofSection({ proof, number }: LabProofSectionProps) {
  const headingId = `proof-${proof.id}`;

  return (
    <article aria-labelledby={headingId} className="grid gap-6 lg:grid-cols-12 lg:gap-12">
      <header className="lg:col-span-3">
        <p className="specimen-label">Proof {number}</p>
        <h3 id={headingId} className="mt-1 font-display text-3xl font-normal sm:text-4xl">
          {proof.title}
        </h3>
        <code className="mt-2 block font-mono text-sm text-accent">{proof.syntax}</code>
        <p className="mt-3 max-w-sm leading-relaxed text-muted">{proof.description}</p>
      </header>

      {proof.layout === 'justified' ? (
        <div className="flex items-start gap-2 sm:gap-3 lg:col-span-9">
          {proof.plates.map((plate) => (
            <ProofPlate
              key={plate.src}
              plate={plate}
              className="min-w-0"
              style={{ flex: `${plate.width / plate.height} 1 0%` }}
            />
          ))}
        </div>
      ) : (
        <div className="relative -mx-5 flex snap-x gap-1.5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0 lg:col-span-9">
          {proof.plates.map((plate) => (
            <ProofPlate key={plate.src} plate={plate} className="w-[38%] shrink-0 snap-start sm:w-auto sm:min-w-0 sm:flex-1" />
          ))}
        </div>
      )}
    </article>
  );
}
