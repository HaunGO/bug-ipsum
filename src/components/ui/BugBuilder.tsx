'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { CopyUrlField } from './CopyUrlField';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSpecimen } from './SpecimenContext';
import { bugImages } from '@/lib/bug-images';
import { formatPlateNumber, getSpecimenLabel } from '@/lib/specimen-labels';

const MAX_DIMENSION = 5000;
const PREVIEW_DEBOUNCE_MS = 250;
const DEFAULT_TINT = '#4ecdc4';
const HEX_PATTERN = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

type EffectKey = 'saturation' | 'blur' | 'contrast';

const EFFECT_MAX = 9;
const THUMB_PX = 20;

const EFFECTS: { key: EffectKey; label: string; ticks: [number, string][] }[] = [
  { key: 'saturation', label: 'Saturation', ticks: [[0, 'off'], [1, 'grey'], [5, 'natural'], [9, 'vivid']] },
  { key: 'blur', label: 'Blur', ticks: [[0, 'off'], [1, 'soft'], [9, 'heavy']] },
  { key: 'contrast', label: 'Contrast', ticks: [[0, 'off'], [1, 'flat'], [5, 'natural'], [9, 'harsh']] },
];

// Centres a tick label under the slider thumb position for `value`.
function tickStyle(value: number): React.CSSProperties {
  const shift = value === 0 ? `-${THUMB_PX / 2}px` : value === EFFECT_MAX ? `calc(-100% + ${THUMB_PX / 2}px)` : '-50%';
  return {
    left: `calc(${value / EFFECT_MAX} * (100% - ${THUMB_PX}px) + ${THUMB_PX / 2}px)`,
    transform: `translateX(${shift})`,
  };
}

function parseDimension(value: string): number | null {
  const n = Number.parseInt(value, 10);
  if (Number.isNaN(n) || n < 1) return null;
  return Math.min(n, MAX_DIMENSION);
}

function expandHex(hex: string): string {
  const raw = hex.replace('#', '').toLowerCase();
  return raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw;
}

export function BugBuilder() {
  const { specimen, setSpecimen } = useSpecimen();
  const [origin, setOrigin] = useState('https://bugipsum.com');

  const [width, setWidth] = useState(640);
  const [height, setHeight] = useState(480);
  const [widthDraft, setWidthDraft] = useState('640');
  const [heightDraft, setHeightDraft] = useState('480');
  const [effects, setEffects] = useState<Record<EffectKey, number>>({ saturation: 0, blur: 0, contrast: 0 });
  const [tint, setTint] = useState('');
  const [tintDraft, setTintDraft] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const path = useMemo(() => {
    const params = new URLSearchParams();
    if (specimen !== null) params.set('image', String(specimen));
    for (const { key } of EFFECTS) {
      if (effects[key] > 0) params.set(key, String(effects[key]));
    }
    if (tint) params.set('tint', tint);
    const query = params.toString();
    return `/api/${width}/${height}${query ? `?${query}` : ''}`;
  }, [specimen, width, height, effects, tint]);

  // Copy URL updates instantly; the preview request waits for the controls to settle.
  const [previewSrc, setPreviewSrc] = useState(path);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const previewRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (path === previewSrc) return;
    const timer = setTimeout(() => setPreviewSrc(path), PREVIEW_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [path, previewSrc]);

  useEffect(() => {
    const img = previewRef.current;
    if (img?.complete && img.naturalWidth > 0) setLoadedSrc(previewSrc);
  }, [previewSrc]);

  const isDeveloping = loadedSrc !== previewSrc && failedSrc !== previewSrc;

  const handleDimension = (axis: 'width' | 'height', value: string) => {
    const setDraft = axis === 'width' ? setWidthDraft : setHeightDraft;
    const setValue = axis === 'width' ? setWidth : setHeight;
    setDraft(value);
    const n = parseDimension(value);
    if (n !== null) setValue(n);
  };

  const handleTintDraft = (value: string) => {
    setTintDraft(value);
    if (value.trim() === '') setTint('');
    else if (HEX_PATTERN.test(value.trim())) setTint(expandHex(value.trim()));
  };

  const applyPickedTint = (hex: string) => {
    setTint(expandHex(hex));
    setTintDraft(hex.replace('#', ''));
  };

  const clearTint = () => {
    setTint('');
    setTintDraft('');
  };

  const widthTooBig = Number.parseInt(widthDraft, 10) > MAX_DIMENSION;
  const heightTooBig = Number.parseInt(heightDraft, 10) > MAX_DIMENSION;
  const tintInvalid = tintDraft.trim() !== '' && !HEX_PATTERN.test(tintDraft.trim());

  return (
    <section id="builder" aria-labelledby="builder-title" className="scroll-mt-16 bg-raised">
      <div className="section-shell section-block">
        <header className="mb-8 flex flex-col gap-4 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="specimen-label">01 — The bench</p>
            <h2 id="builder-title" className="type-section mt-2 lg:text-7xl">
              Bug Builder
            </h2>
          </div>
          <p className="type-lede max-w-md">
            Pick a specimen, set the size and effects, copy the URL. The preview is the real image your URL returns.
          </p>
        </header>

        <CopyUrlField origin={origin} path={path} />

        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Preview */}
          <div className="lg:order-2 lg:col-span-7">
            <div className="lg:sticky lg:top-24">
              <div className="relative flex h-[min(52svh,420px)] items-center justify-center overflow-hidden rounded-plate bg-sunken p-4 sm:p-6 lg:h-[min(70svh,600px)]">
                {failedSrc === previewSrc ? (
                  <p className="max-w-xs text-center text-muted-foreground">
                    That one didn&apos;t develop. Check the size and tint, then try again.
                  </p>
                ) : (
                  <Image
                    ref={previewRef}
                    src={previewSrc}
                    alt={specimen === null ? 'Preview: a random bug' : `Preview: ${getSpecimenLabel(specimen)}`}
                    width={width}
                    height={height}
                    unoptimized
                    onLoad={() => setLoadedSrc(previewSrc)}
                    onError={() => setFailedSrc(previewSrc)}
                    className={`motion-preview h-auto max-h-full w-auto max-w-full ${isDeveloping ? 'opacity-40' : 'opacity-100'}`}
                  />
                )}
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-4">
                <span className="specimen-label">
                  {width} × {height} px
                  {specimen === null ? ' · random' : ` · ${formatPlateNumber(specimen)}`}
                </span>
                <span className="font-mono text-xs text-muted-foreground" aria-hidden="true">
                  {isDeveloping ? 'Developing…' : 'Scaled to fit'}
                </span>
              </div>
              {specimen === null && (
                <p className="mt-2 text-sm text-muted-foreground">Random mode: every load of this URL returns a different bug.</p>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-10 lg:order-1 lg:col-span-5">
            <fieldset>
              <legend className="specimen-label">Specimen</legend>
              <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="font-display text-2xl">
                  {specimen === null ? 'Any bug, at random' : getSpecimenLabel(specimen)}
                </p>
                <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 font-mono text-sm text-muted-foreground hover:text-ink">
                  <input
                    type="radio"
                    name="specimen"
                    value="random"
                    checked={specimen === null}
                    onChange={() => setSpecimen(null)}
                    className="h-4 w-4 accent-accent"
                  />
                  Random bug
                </label>
              </div>
              <div className="mt-3 grid grid-cols-7 gap-2">
                {bugImages.map((filename, index) => {
                  const label = getSpecimenLabel(index);
                  return (
                    <label key={filename} title={`${formatPlateNumber(index)} · ${label}`} className="group relative block cursor-pointer">
                      <input
                        type="radio"
                        name="specimen"
                        value={index}
                        checked={specimen === index}
                        onChange={() => setSpecimen(index)}
                        className="peer sr-only"
                      />
                      <span className="sr-only">
                        {formatPlateNumber(index)}, {label}
                      </span>
                      <Image
                        src={`/api/96/96?image=${index}`}
                        alt=""
                        width={96}
                        height={96}
                        unoptimized
                        loading="lazy"
                        className="aspect-square w-full rounded-plate object-cover opacity-80 transition-opacity group-hover:opacity-100 peer-checked:opacity-100"
                      />
                      <span className="pointer-events-none absolute inset-0 rounded-plate ring-inset peer-checked:ring-[3px] peer-checked:ring-accent peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent" />
                    </label>
                  );
                })}
              </div>
              <p className="mt-2 font-mono text-xs text-muted-foreground">
                Number = <code>?image=</code> value. Arrow keys move between specimens.
              </p>
            </fieldset>

            <fieldset>
              <legend className="specimen-label">Size</legend>
              <div className="mt-3 flex items-end gap-3">
                <div className="flex-1">
                  <label htmlFor="builder-width" className="mb-1 block font-mono text-sm">
                    Width
                  </label>
                  <Input
                    id="builder-width"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={MAX_DIMENSION}
                    value={widthDraft}
                    onChange={(e) => handleDimension('width', e.target.value)}
                    onBlur={() => setWidthDraft(String(width))}
                    aria-describedby="builder-size-hint"
                    aria-invalid={widthTooBig}
                  />
                </div>
                <span className="pb-3 font-mono text-muted-foreground" aria-hidden="true">
                  ×
                </span>
                <div className="flex-1">
                  <label htmlFor="builder-height" className="mb-1 block font-mono text-sm">
                    Height
                  </label>
                  <Input
                    id="builder-height"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={MAX_DIMENSION}
                    value={heightDraft}
                    onChange={(e) => handleDimension('height', e.target.value)}
                    onBlur={() => setHeightDraft(String(height))}
                    aria-describedby="builder-size-hint"
                    aria-invalid={heightTooBig}
                  />
                </div>
              </div>
              <p id="builder-size-hint" className="mt-2 font-mono text-xs text-muted-foreground">
                {widthTooBig || heightTooBig ? `Capped at ${MAX_DIMENSION}px per side.` : `Pixels, 1–${MAX_DIMENSION} per side.`}
              </p>
            </fieldset>

            <fieldset>
              <legend className="specimen-label">Effects</legend>
              <div className="mt-3 space-y-5">
                {EFFECTS.map(({ key, label, ticks }) => {
                  const value = effects[key];
                  const id = `builder-${key}`;
                  return (
                    <div key={key}>
                      <div className="flex items-baseline justify-between">
                        <label htmlFor={id} className="font-mono text-sm">
                          {label}
                        </label>
                        <span className="font-mono text-sm text-muted-foreground" aria-hidden="true">
                          {value === 0 ? 'off' : value}
                        </span>
                      </div>
                      <input
                        id={id}
                        type="range"
                        min={0}
                        max={EFFECT_MAX}
                        step={1}
                        value={value}
                        data-off={value === 0}
                        aria-valuetext={value === 0 ? 'off' : String(value)}
                        onChange={(e) => setEffects((prev) => ({ ...prev, [key]: Number(e.target.value) }))}
                        className="lab-range"
                      />
                      <div className="relative h-4 font-mono text-xs text-muted-foreground" aria-hidden="true">
                        {ticks.map(([tickValue, word]) => (
                          <span key={tickValue} className="absolute top-0 whitespace-nowrap" style={tickStyle(tickValue)}>
                            {word}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}

                <div>
                  <label htmlFor="builder-tint" className="font-mono text-sm">
                    Tint
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      type="color"
                      aria-label="Pick a tint colour"
                      value={`#${tint || expandHex(DEFAULT_TINT)}`}
                      onChange={(e) => applyPickedTint(e.target.value)}
                      className="h-11 w-14 shrink-0 cursor-pointer rounded-plate border border-line bg-sunken p-1"
                    />
                    <div className="relative flex-1">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-muted-foreground">#</span>
                      <Input
                        id="builder-tint"
                        type="text"
                        autoComplete="off"
                        spellCheck={false}
                        maxLength={7}
                        placeholder="none"
                        value={tintDraft}
                        onChange={(e) => handleTintDraft(e.target.value)}
                        aria-describedby="builder-tint-hint"
                        aria-invalid={tintInvalid}
                        className="pl-7"
                      />
                    </div>
                    {tint && (
                      <Button type="button" variant="quiet" onClick={clearTint}>
                        Clear<span className="sr-only"> tint</span>
                      </Button>
                    )}
                  </div>
                  <p id="builder-tint-hint" className="mt-2 font-mono text-xs text-muted-foreground">
                    {tintInvalid ? 'Use a 3- or 6-digit hex colour, like ff6b6b.' : 'Hex colour, no # needed in the URL.'}
                  </p>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </section>
  );
}
