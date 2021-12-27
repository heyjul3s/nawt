import { rgbToHex, extractRgbValue } from '../src/rgb-to-hex';

describe('RGBtoHex', () => {
  it('should a hex string value when passed 3 numeric arguments', () => {
    expect(rgbToHex(97, 58, 136)).toEqual('#613a88');
  });

  it('should return a string hex value when passed an rgb prefixed string', () => {
    expect(rgbToHex('rgb(111,  147, 11)')).toEqual('#6f930b');
  });
});

describe('extractRgbValue', () => {
  it('should return UNDEFINED if provided an invalid value', () => {
    expect(extractRgbValue('')).toEqual(void 0);
  });

  it('should return an array of strings', () => {
    expect(extractRgbValue('rgb(255, 255, 255)')).toEqual([
      '255',
      ' 255',
      ' 255'
    ]);
  });
});
