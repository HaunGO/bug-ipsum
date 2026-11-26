import { formatPlateNumber, getSpecimenLabel } from '@/lib/specimen-labels';

interface HeroPlateProps {
  imageIndex: number;
}

export function HeroPlate({ imageIndex }: HeroPlateProps) {
  const label = getSpecimenLabel(imageIndex);

  return (
    <section
      aria-labelledby="hero-title"
      className="grid lg:min-h-[calc(100svh-4rem)] lg:grid-cols-12"
    >
      <div className="hero-label-inset motion-label-rise flex flex-col justify-center px-5 pb-8 pt-10 sm:px-8 lg:col-span-5 lg:py-16 lg:pr-12">
        <h1
          id="hero-title"
          className="font-display font-normal leading-[0.82] tracking-[-0.035em] text-[clamp(5rem,22vw,8rem)] lg:text-[clamp(6rem,10.5vw,10.5rem)]"
          style={{ fontVariationSettings: '"SOFT" 30, "WONK" 1' }}
        >
          Bug
          <br />
          <em className="italic">Ipsum</em>
        </h1>

        <p className="mt-8 max-w-[26rem] text-lg leading-relaxed text-muted sm:text-xl">
          A buggy little placeholder image service: real bugs from my own macro photography, sized and styled by URL.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href="#builder" className="btn-primary">
            Build a URL with this bug <span aria-hidden="true">↓</span>
          </a>
          <a
            href="/api/640/480"
            className="font-mono text-sm text-muted underline decoration-line underline-offset-4 hover:text-ink hover:decoration-current"
          >
            or just use /api/640/480
          </a>
        </div>
      </div>

      <figure className="flex flex-col lg:col-span-7">
        <div className="relative h-[52svh] min-h-[320px] overflow-hidden bg-raised lg:h-auto lg:flex-1">
          <picture>
            <source media="(min-width: 1024px)" srcSet={`/api/1400/1300?image=${imageIndex}`} />
            <source media="(min-width: 640px)" srcSet={`/api/1200/800?image=${imageIndex}`} />
            <img
              src={`/api/900/760?image=${imageIndex}`}
              alt={label}
              width={900}
              height={760}
              fetchPriority="high"
              className="motion-plate-settle absolute inset-0 h-full w-full object-cover"
            />
          </picture>
        </div>
        <figcaption className="flex items-baseline justify-between gap-4 px-5 py-3 sm:px-8 lg:px-6">
          <span className="specimen-label">
            {formatPlateNumber(imageIndex)} · {label}
          </span>
          <code className="font-mono text-xs text-muted">?image={imageIndex}</code>
        </figcaption>
      </figure>
    </section>
  );
}
