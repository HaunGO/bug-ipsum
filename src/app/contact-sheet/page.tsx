import type { Metadata } from 'next';
import { bugImages } from '@/lib/bug-images';
import { filenameToLabel, formatPlateNumber } from '@/lib/specimen-labels';

export const metadata: Metadata = {
  title: 'Contact sheet — Bug Ipsum',
  description: 'Every photograph in the Bug Ipsum catalog, in API order.',
};

const DIRECTORY = '/images/bugs/only';

export default function ContactSheetPage() {
  return (
    <div className="section-shell section-block">
      <header className="mb-10 max-w-2xl">
        <p className="specimen-label">Catalog · {bugImages.length} photographs</p>
        <h1 className="type-section mt-2">Contact sheet</h1>
        <p className="type-lede mt-4">
          These are the files the API serves, in <code className="text-foreground">?image=</code> order.
          The folder is <code className="text-foreground">public/images/bugs/only</code>.
        </p>
      </header>

      <ol className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {bugImages.map((filename, index) => {
          const src = `${DIRECTORY}/${filename}`;
          const label = filenameToLabel(filename);
          return (
            <li key={filename}>
              <a href={src} className="group block">
                <span className="block overflow-hidden rounded-plate bg-muted">
                  {/* Full frame, not the API crop, so the sheet shows the file itself. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={label}
                    width={640}
                    height={480}
                    loading={index < 4 ? 'eager' : 'lazy'}
                    className="aspect-[4/5] h-auto w-full object-contain"
                  />
                </span>
                <span className="mt-2 block font-mono text-xs text-muted-foreground">
                  {formatPlateNumber(index)} · ?image={index}
                </span>
                <span className="mt-1 block text-sm leading-snug group-hover:underline group-hover:underline-offset-4">
                  {label}
                </span>
                <span className="mt-1 block break-all font-mono text-xs text-muted-foreground">{filename}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
