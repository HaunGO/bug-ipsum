export interface ProofPlateSpec {
  width: number;
  height: number;
  /** Query/path fragment shown under the plate, e.g. `?blur=3`. */
  caption: string;
  /** Optional plain word for the step, e.g. "natural". */
  note?: string;
  src: string;
}

export interface LabProof {
  id: string;
  title: string;
  syntax: string;
  description: string;
  /** `justified` keeps true proportions in one row; `series` is an equal-width step strip. */
  layout: 'justified' | 'series';
  plates: ProofPlateSpec[];
}

const SERIES_SIZE = { width: 360, height: 450 };

function series(
  param: 'saturation' | 'blur' | 'contrast',
  image: number,
  notes: Record<number, string> = {},
): ProofPlateSpec[] {
  return [1, 3, 5, 7, 9].map((step) => ({
    ...SERIES_SIZE,
    caption: `?${param}=${step}`,
    note: notes[step],
    src: `/api/${SERIES_SIZE.width}/${SERIES_SIZE.height}?image=${image}&${param}=${step}`,
  }));
}

const TINTS: { hex: string; note: string }[] = [
  { hex: 'ff6b6b', note: 'red' },
  { hex: 'ffd93d', note: 'yellow' },
  { hex: '51cf66', note: 'green' },
  { hex: '4ecdc4', note: 'teal' },
  { hex: 'ae3ec9', note: 'purple' },
];

export const labProofs: LabProof[] = [
  {
    id: 'dimensions',
    title: 'Dimensions',
    syntax: '/api/{width}/{height}',
    description: 'Any size from 1 to 5000 pixels per side. The photo is cropped to fill, never stretched.',
    layout: 'justified',
    plates: [
      { width: 300, height: 300, caption: '/api/300/300', note: 'square', src: '/api/300/300?image=1' },
      { width: 200, height: 300, caption: '/api/200/300', note: 'portrait', src: '/api/200/300?image=6' },
      { width: 784, height: 300, caption: '/api/784/300', note: 'landscape', src: '/api/784/300?image=20' },
    ],
  },
  {
    id: 'saturation',
    title: 'Saturation',
    syntax: '?saturation=1–9',
    description: 'Drains or boosts colour. 1 is nearly greyscale, 5 leaves the photo as shot, 9 is loud.',
    layout: 'series',
    plates: series('saturation', 18, { 1: 'grey', 5: 'natural', 9: 'vivid' }),
  },
  {
    id: 'blur',
    title: 'Blur',
    syntax: '?blur=1–9',
    description: 'Softens the specimen, from a slight haze at 1 to an out-of-focus wash at 9. Handy behind text.',
    layout: 'series',
    plates: series('blur', 14, { 1: 'soft', 9: 'heavy' }),
  },
  {
    id: 'contrast',
    title: 'Contrast',
    syntax: '?contrast=1–9',
    description: 'Flattens or punches up tones. 5 is unchanged; low values make quiet backgrounds.',
    layout: 'series',
    plates: series('contrast', 10, { 1: 'flat', 5: 'natural', 9: 'harsh' }),
  },
  {
    id: 'tint',
    title: 'Tint',
    syntax: '?tint={hex}',
    description: 'Washes the photo in one colour. Use a 3- or 6-digit hex value; the # is optional.',
    layout: 'series',
    plates: TINTS.map(({ hex, note }) => ({
      ...SERIES_SIZE,
      caption: `?tint=${hex}`,
      note,
      src: `/api/${SERIES_SIZE.width}/${SERIES_SIZE.height}?image=0&tint=${hex}`,
    })),
  },
];
