import { isString } from './utils';

export function getNumericValue(size: number | string): number {
  if (isString(size)) {
    return extractNumericValue(size as string);
  }

  if (!!size && isFinite(size as number)) {
    return size as number;
  }

  return 0;
}

export function extractNumericValue(size: string): number {
  const WORD_REGEX = /(\D*)$/i;
  return Number(size.replace(WORD_REGEX, ''));
}
