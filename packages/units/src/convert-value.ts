import { formulas } from './formulas';
import { unitTypes } from './unit-types';

export function convertValue(value: string, toUnit: string, baseSize = 16) {
  const conversionFn = getFormulaFn(value, toUnit);
  const convertedValue = conversionFn(value, baseSize);

  return !!convertedValue ? appendUnit(convertedValue, toUnit) : void 0;
}

export function appendUnit(value: number, unit: string): string {
  return value && unit ? `${value}${unit}` : '';
}

export function getFormulaFn(size: string, toUnit: string) {
  const formulaType = getConversionType(size, toUnit);

  return formulas?.[formulaType];
}

export function getConversionType(size: string, toUnitType: string): string {
  const fromUnit = extractUnit(size);
  const toUnit = toUnitType.charAt(0).toUpperCase() + toUnitType.slice(1);

  return !!fromUnit ? `${fromUnit}To${toUnit}` : '';
}

export function extractUnit(value: string): string {
  const unitRegexKeys = [...Object.keys(unitTypes), '\\.'].join('|');
  const UNIT_REGEX = new RegExp(unitRegexKeys, 'g');

  return value.replace(UNIT_REGEX, '');
}
