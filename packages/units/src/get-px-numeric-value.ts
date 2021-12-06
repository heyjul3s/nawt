export function getPxNumericValue(size: number | string): number {
  if (isString(size)) {
    return extractPxNumericValue(size as string);
  }

  if (!!size && isFinite(size as number)) {
    return size as number;
  }

  return 0;
}

export function extractPxNumericValue(size: string): number {
  const WORD_REGEX = /(\D*)$/i;
  return Number(size.replace(WORD_REGEX, ''));
}

export function isString(value: unknown): boolean {
  return Object.prototype.toString.call(value) === '[object String]';
}
