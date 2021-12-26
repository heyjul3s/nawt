import {
  createMediaQuery,
  deparenthesizeQuery,
  parseQueryExpressionTokens,
  removeExcessSpacings
} from '../src/media/media';

describe('createMediaQuery', () => {
  it('should return an empty string if provided value is an empty string', () => {
    expect(createMediaQuery('')).toEqual('');
  });

  it('should return the appropriate statement media queries', () => {
    expect(createMediaQuery('pointerCoarse')).toEqual('(pointer: coarse)');
    expect(createMediaQuery('darkColorScheme')).toEqual(
      '(prefers-color-scheme: dark)'
    );
  });
});

describe('parseQueryExpressionTokens', () => {
  it('should...', () => {
    expect(
      parseQueryExpressionTokens([
        {
          index: 0,
          type: 'statement',
          value: 'pointer: fine',
          token: 'pointerFine'
        }
      ])
    ).toEqual('(pointer: fine)');

    expect(
      parseQueryExpressionTokens([
        {
          index: 0,
          type: 'statement',
          value: 'any-pointer: fine',
          token: 'anyPointerFine'
        }
      ])
    ).toEqual('(any-pointer: fine)');

    expect(
      parseQueryExpressionTokens([
        {
          index: 0,
          type: 'ranged',
          value: 'min-width: 50em',
          token: 'width >= 50em'
        }
      ])
    ).toEqual('(min-width: 50em)');

    expect(
      parseQueryExpressionTokens([
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

describe('deparenthesizeQuery - removes any parentheses if found in a string', () => {
  it('should remove query parentheses if present', () => {
    expect(
      deparenthesizeQuery(
        '(pointerCoarse) && (width >= 30em || height >= 30em)'
      )
    ).toEqual('pointerCoarse && width >= 30em || height >= 30em');
  });

  it('should return the query value as is if no parentheses are found', () => {
    expect(deparenthesizeQuery('')).toEqual('');
    expect(deparenthesizeQuery('pointerCoarse && width >= 30em')).toEqual(
      'pointerCoarse && width >= 30em'
    );
  });
});

describe('removeExcessSpacings', () => {
  it('should return the string as is if correctly single spaced', () => {
    expect(removeExcessSpacings('hover && width >= 30em')).toEqual(
      'hover && width >= 30em'
    );
  });

  it('should return strings with only single spacings', () => {
    expect(removeExcessSpacings('hover  &&    width >= 30em')).toEqual(
      'hover && width >= 30em'
    );
  });
});
