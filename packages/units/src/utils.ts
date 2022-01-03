export function isString(value: unknown): boolean {
  return Object.prototype.toString.call(value) === '[object String]';
}

export function isFloat(value: number) {
  return value !== Math.floor(value);
}

export function toTwoDecimals(value: number) {
  const stringValue = String(value);
  return isFloat(value) ? parseFloat(stringValue)?.toFixed(2) : stringValue;
}
