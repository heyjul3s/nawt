import { createMediaQuery } from '../../src/media/create-media-query';

describe('createMediaQuery - parses a given query and returns a valid media query string', () => {
  it('should return an empty string if provided value is an empty string', () => {
    expect(createMediaQuery('')).toEqual('');
  });

  it('should return a query as is if it does not match any predefined queries and or structure', () => {
    //
  });

  it('should return the appropriate statement media queries', () => {
    expect(createMediaQuery('pointerCoarse')).toEqual('(pointer: coarse)');
    expect(createMediaQuery('darkColorScheme')).toEqual(
      '(prefers-color-scheme: dark)'
    );
  });
});
