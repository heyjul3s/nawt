export function rgbToHex(...value: any): string {
  const rgbValue = compactRgbValue(value);

  const r = rgbValue[0];
  const g = rgbValue[1];
  const b = rgbValue[2];

  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function compactRgbValue(value: any): number[] {
  const rgbArray =
    value?.length === 1
      ? extractRgbValue((value as string[]).toString())
      : value;

  return rgbArray?.map((v) => {
    const trimmedValue = isString(v) ? v.trim() : v;
    return parseInt(trimmedValue);
  });
}

export function extractRgbValue(value: string): string[] {
  return !!value ? value?.split('(')[1]?.split(')')?.[0]?.split(',') : [];
}

export function isString(value: unknown): boolean {
  return Object.prototype.toString.call(value) === '[object String]';
}
