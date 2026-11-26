import { getImageByIndex } from './bug-images';

// jumping-spider.jpg → "Jumping spider"; strips Flickr export suffixes like `_27937308242_o`.
export function filenameToLabel(filename: string): string {
  const words = filename
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/_\d+_o$/, '')
    .replace(/[-_]+/g, ' ')
    .trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export function getSpecimenLabel(index: number): string {
  return filenameToLabel(getImageByIndex(index));
}

// Catalog number shown on plates; matches the `?image=` value.
export function formatPlateNumber(index: number): string {
  return `No. ${String(index).padStart(2, '0')}`;
}
