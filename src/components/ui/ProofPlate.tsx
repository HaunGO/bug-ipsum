import Image from 'next/image';
import type { ProofPlateSpec } from '@/lib/lab-proofs';

interface ProofPlateProps {
  plate: ProofPlateSpec;
  className?: string;
  style?: React.CSSProperties;
}

export function ProofPlate({ plate, className = '', style }: ProofPlateProps) {
  const { src, width, height, caption, note } = plate;
  return (
    <figure className={className} style={style}>
      <a href={src} target="_blank" rel="noopener noreferrer" className="group relative block">
        <Image
          src={src}
          alt=""
          width={width}
          height={height}
          unoptimized
          loading="lazy"
          className="h-auto w-full bg-sunken"
        />
        <figcaption className="mt-2 flex flex-col gap-0.5">
          <code className="break-all font-mono text-sm text-ink group-hover:underline group-hover:underline-offset-4">
            {caption}
          </code>
          {note && <span className="font-mono text-xs text-muted">{note}</span>}
          <span className="sr-only"> — open this image URL in a new tab</span>
        </figcaption>
      </a>
    </figure>
  );
}
