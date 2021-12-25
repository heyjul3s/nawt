import {
  deparenthesizeQuery,
  findTokenParentKey,
  sortBy
} from '../src/media/utils';

describe('findTokenParentKey - searches for a parent key to be used as a token type', () => {
  it('should return undefined if no matches were found', () => {
    expect(findTokenParentKey('lorem ipsum dolor sit amet')).toEqual(void 0);
  });

  it('should return the type of of a token', () => {
    expect(findTokenParentKey('landscape')).toEqual('statement');
    expect(findTokenParentKey('&&')).toEqual('logical');
    expect(findTokenParentKey('width')).toEqual('ranged');
    expect(findTokenParentKey('3.5rem')).toEqual('unit');
    expect(findTokenParentKey('-1')).toEqual('unit');
  });
});

describe('deparenthesizeQuery - removes any parentheses if found in a string', () => {
  it('should remove query parentheses if present', () => {
    expect(
      deparenthesizeQuery('(pointer) && (width >= 30em || height >= 30em)')
    ).toEqual('pointer && width >= 30em || height >= 30em');
  });

  it('should return the query value as is if no parentheses are found', () => {
    expect(deparenthesizeQuery('')).toEqual('');
    expect(deparenthesizeQuery('pointer && width >= 30em')).toEqual(
      'pointer && width >= 30em'
    );
  });
});

describe('sortBy - sorts an array of objects via property and orders them in relation to the provided sequence order', () => {
  it('should return an empty array if both array value and order sequence is an empty array', () => {
    const arrayValue = [];
    const arrayOrder = [];

    expect(sortBy(arrayValue, arrayOrder, 'index')).toEqual([]);
  });

  it('should return undefined if both ARRAY VALUE and ARRAY ORDER sequence is undefined', () => {
    const arrayValue = void 0;
    const arrayOrder = void 0;

    expect(sortBy(arrayValue, arrayOrder, 'index')).toEqual(void 0);
  });

  it('should return undefined if ARRAY VALUE is undefined', () => {
    const arrayValue = void 0;
    const arrayOrder = [1, 2, 3];

    expect(sortBy(arrayValue, arrayOrder, 'index')).toEqual(void 0);
  });

  it('should return the array value as is if ARRAY ORDER is undefined', () => {
    const arrayValue = [{ index: 1 }, { index: 3 }, { index: 2 }];
    const arrayOrder = void 0;

    expect(sortBy(arrayValue, arrayOrder, 'index')).toEqual(arrayValue);
  });

  it('should return the array value as is if the property argument is undefined', () => {
    const arrayValue = [{ index: 1 }, { index: 3 }, { index: 2 }];
    const arrayOrder = [3, 2, 1];

    expect(sortBy(arrayValue, arrayOrder, void 0)).toEqual(arrayValue);
  });

  it('should return an array sorted by the given sort order', () => {
    const arrayValue = [{ index: 1 }, { index: 3 }, { index: 2 }];
    const arrayOrder = [3, 2, 1];

    expect(sortBy(arrayValue, arrayOrder, 'index')).toEqual([
      { index: 3 },
      { index: 2 },
      { index: 1 }
    ]);
  });
});
