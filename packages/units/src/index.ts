import { convertValue } from './convert-value';

export const pxToEm = (value: string, baseSize: number = 16) =>
  convertValue(value, 'em', baseSize);

export const pxToRem = (value: string, baseSize: number = 16) =>
  convertValue(value, 'rem', baseSize);

export const emToPx = (value: string, baseSize: number = 16) =>
  convertValue(value, 'px', baseSize);

export const remToPx = (value: string, baseSize: number = 16) =>
  convertValue(value, 'px', baseSize);
