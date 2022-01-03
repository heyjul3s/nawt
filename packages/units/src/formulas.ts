import { getNumericValue } from './get-numeric-value';
import { toTwoDecimals } from './utils';

const pxToEm = (value: string, baseSize = 16): string => {
  const numericValue = getNumericValue(value);
  return toTwoDecimals(numericValue / baseSize);
};

const pxToRem = pxToEm;

const emToPx = (value: string, baseSize = 16): string => {
  const numericValue = getNumericValue(value);
  return toTwoDecimals(numericValue * baseSize);
};

const remToPx = emToPx;

export const formulas = {
  pxToEm,
  pxToRem,
  emToPx,
  remToPx
};
