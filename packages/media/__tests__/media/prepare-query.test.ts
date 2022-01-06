import {
  deparenthesizeQuery,
  removeExcessSpacings
} from '../../src/media/prepare-query';

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

describe('removeExcessSpacings - ensures that a given string will only have one space only per spacing', () => {
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
