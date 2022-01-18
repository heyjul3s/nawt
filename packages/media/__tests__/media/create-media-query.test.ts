import { createMq, createMqs } from '../../src/media/create-media-query';

describe('createMqs', () => {
  it('should return an empty string if provided value is an empty string', () => {
    expect(
      createMqs([
        { key: 'tablet', query: 'width >= 768px', mediaType: 'screen' },
        { key: 'desktop', query: 'width >= 1200px', mediaType: 'screen' }
      ])
    ).toEqual({
      tablet: '@media screen and (min-width: 768px)',
      desktop: '@media screen and (min-width: 1200px)'
    });
  });
});

describe('createMq - parses a given query and returns a valid media query string', () => {
  it('should return an empty string if provided value is an empty string', () => {
    expect(createMq('')).toEqual('');
  });

  it('should return the appropriate statement media queries', () => {
    expect(createMq('pointerCoarse')).toEqual('@media (pointer: coarse)');
    expect(createMq('darkColorScheme')).toEqual(
      '@media (prefers-color-scheme: dark)'
    );
  });

  it('should return the appropriate ranged media queries', () => {
    expect(createMq('width == 50em')).toEqual('@media (width: 50em)');
    expect(createMq('width >= 50em')).toEqual('@media (min-width: 50em)');
    expect(createMq('30em >= width <= 50em')).toEqual(
      '@media (min-width: 30em) and (max-width: 50em)'
    );
  });

  it('should return both min widths value as media query string regardless of having the same operator', () => {
    expect(createMq('30em >= width >= 50em')).toEqual(
      '@media (min-width: 30em) and (min-width: 50em)'
    );
  });

  it('should return raw media query strings as is', () => {
    expect(createMq('(min-width: 768px) and (max-width: 1024px)')).toEqual(
      '@media (min-width: 768px) and (max-width: 1024px)'
    );
  });
});
