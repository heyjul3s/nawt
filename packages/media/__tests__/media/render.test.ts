import { renderMediaQuery, renderRangedQuery } from '../../src/media/render';

describe('renderMediaQuery', () => {
  it('should parse and return a valid media query string given a valid token', () => {
    expect(
      renderMediaQuery([
        {
          index: 0,
          type: 'statement',
          value: 'pointer: fine',
          token: 'pointerFine'
        }
      ])
    ).toEqual('(pointer: fine)');

    expect(
      renderMediaQuery([
        {
          index: 0,
          type: 'statement',
          value: 'any-pointer: fine',
          token: 'anyPointerFine'
        }
      ])
    ).toEqual('(any-pointer: fine)');

    expect(
      renderMediaQuery([
        {
          index: 0,
          type: 'ranged',
          value: 'min-width: 50em',
          token: 'width >= 50em'
        }
      ])
    ).toEqual('(min-width: 50em)');

    expect(
      renderMediaQuery([
        {
          index: 0,
          type: 'ranged',
          value: '(min-width: 30em) and (max-width: 50em)',
          token: '30em >= width <= 50em'
        }
      ])
    ).toEqual('(min-width: 30em) and (max-width: 50em)');
  });
});

describe('renderRangedQuery', () => {
  it('should return the appropriate ranged media queries', () => {
    expect(renderRangedQuery('width >= 50em')).toEqual('min-width: 50em');

    expect(renderRangedQuery('width <= 50em')).toEqual('max-width: 50em');

    expect(renderRangedQuery('width == 30em')).toEqual('width: 30em');

    expect(renderRangedQuery('30em >= width <= 50em')).toEqual(
      '(min-width: 30em) and (max-width: 50em)'
    );
  });

  it('should return the appropriate ranged statement media queries', () => {
    expect(renderRangedQuery('ratio >= 8/5')).toEqual('min-aspect-ratio: 8/5');

    expect(renderRangedQuery('ratio <= 3/2')).toEqual('max-aspect-ratio: 3/2');

    expect(renderRangedQuery('ratio == 1/1')).toEqual('aspect-ratio: 1/1');

    expect(renderRangedQuery('res >= 300dpi')).toEqual(
      'min-resolution: 300dpi'
    );
    expect(renderRangedQuery('res <= 300dpi')).toEqual(
      'max-resolution: 300dpi'
    );
    expect(renderRangedQuery('res == 300dpi')).toEqual('resolution: 300dpi');
  });
});
