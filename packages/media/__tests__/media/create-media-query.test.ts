import {
  createMediaQuery,
  createMediaQueries
} from '../../src/media/create-media-query';

describe('createMediaQueries', () => {
  it('should return an empty string if provided value is an empty string', () => {
    expect(
      createMediaQueries([
        { key: 'tablet', query: 'width >= 768px', mediaType: 'screen' },
        { key: 'desktop', query: 'width >= 1200px', mediaType: 'screen' }
      ])
    ).toEqual({
      tablet: '@media screen and (min-width: 768px)',
      desktop: '@media screen and (min-width: 1200px)'
    });
  });
});

describe('createMediaQuery - parses a given query and returns a valid media query string', () => {
  it('should return an empty string if provided value is an empty string', () => {
    expect(createMediaQuery('')).toEqual('');
  });

  it('should return the appropriate statement media queries', () => {
    expect(createMediaQuery('pointerCoarse')).toEqual(
      '@media (pointer: coarse)'
    );
    expect(createMediaQuery('darkColorScheme')).toEqual(
      '@media (prefers-color-scheme: dark)'
    );
  });

  it('should return the appropriate ranged media queries', () => {
    expect(createMediaQuery('width == 50em')).toEqual('@media (width: 50em)');
    expect(createMediaQuery('width >= 50em')).toEqual(
      '@media (min-width: 50em)'
    );
    expect(createMediaQuery('30em >= width <= 50em')).toEqual(
      '@media (min-width: 30em) and (max-width: 50em)'
    );
  });

  it('should return both min widths value as media query string regardless of having the same operator', () => {
    expect(createMediaQuery('30em >= width >= 50em')).toEqual(
      '@media (min-width: 30em) and (min-width: 50em)'
    );
  });

  it('should return raw media query strings as is', () => {
    expect(
      createMediaQuery('(min-width: 768px) and (max-width: 1024px)')
    ).toEqual('@media (min-width: 768px) and (max-width: 1024px)');
  });
});
