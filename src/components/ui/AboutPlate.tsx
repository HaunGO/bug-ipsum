export function AboutPlate() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-shell py-20 lg:py-28">
      <div className="grid gap-8 rounded-plate border border-line p-6 sm:p-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <p className="specimen-label">04 — About</p>
          <h2 id="about-title" className="mt-2 font-display text-4xl font-normal italic tracking-tight sm:text-5xl">
            What is the meaning of this?
          </h2>
        </div>

        <div className="max-w-2xl space-y-5 text-lg leading-relaxed lg:col-span-8">
          <p>
            A buggy little placeholder image service featuring my own real photos of insects, spiders, moths, and
            such… <em>just for fun!</em>
          </p>
          <p className="text-muted">
            Every photo is mine, and most of them also live on{' '}
            <a
              href="https://www.flickr.com/photos/haungo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-line underline-offset-4 hover:decoration-current"
            >
              my Flickr
            </a>
            . I&apos;ll surely be adding more.
          </p>
          <p className="font-mono text-sm text-muted">
            Next.js · TypeScript · Tailwind · Sharp · 20+ years of tinkerin&apos;
          </p>
          <p>
            ~{' '}
            <a
              href="https://brandonhaun.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-2xl italic underline decoration-line underline-offset-4 hover:decoration-current"
            >
              Brandon Haun
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
