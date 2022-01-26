import { emToPx, remToPx, pxToEm, pxToRem } from '../src/index';

describe('pxToRem', () => {
  it('should return the correct Rem values', () => {
    expect(pxToRem('32px')).toEqual('2rem');
    expect(pxToRem('32px', 8)).toEqual('4rem');
  });

  it('should return a value with only 2 decimals if it is a float', () => {
    expect(pxToRem('32px', 6)).toEqual('5.33rem');
  });
});

describe('pxToEm', () => {
  it('should return the correct Em values', () => {
    expect(pxToEm('32px')).toEqual('2em');
    expect(pxToEm('32px', 8)).toEqual('4em');
  });

  it('should return a value with only 2 decimals if it is a float', () => {
    expect(pxToEm('32px', 6)).toEqual('5.33em');
  });
});

describe('emToPx', () => {
  it('should return the correct PX values', () => {
    expect(emToPx('2.5em')).toEqual('40px');
    expect(emToPx('3em', 8)).toEqual('24px');
  });

  it('should return a value with only 2 decimals if it is a float', () => {
    expect(emToPx('3.2em', 8)).toEqual('25.60px');
  });
});

describe('remToPx', () => {
  it('should return the correct PX values', () => {
    expect(remToPx('2.5em')).toEqual('40px');
    expect(remToPx('3em', 8)).toEqual('24px');
  });

  it('should return a value with only 2 decimals if it is a float', () => {
    expect(remToPx('3.2em', 8)).toEqual('25.60px');
  });
});
