import { sortBy, sortRangedQueryTokens } from '../../src/media/sort';

describe('sortRangedQueryTokens - sorts ranged media query tokens in accordance to predefined sequences before parsing to a valid value', () => {
  it('should sort and split min/max ranged query tokens to 2 separate arrays', () => {
    expect(
      sortRangedQueryTokens([
        { token: 'width', type: 'ranged', value: 'width' },
        { token: '<=', type: 'relational', value: 'max' },
        { token: '50em', type: 'unit', value: '50em' }
      ])
    ).toEqual([
      { token: '<=', type: 'relational', value: 'max' },
      { token: 'width', type: 'ranged', value: 'width' },
      { token: '50em', type: 'unit', value: '50em' }
    ]);
  });

  it('should sort and split min/max ranged query tokens to 2 separate arrays', () => {
    expect(
      sortRangedQueryTokens([
        { token: '30em', type: 'unit', value: '30em' },
        { token: '>=', type: 'relational', value: 'min' },
        { token: 'width', type: 'ranged', value: 'width' },
        { token: '<=', type: 'relational', value: 'max' },
        { token: '50em', type: 'unit', value: '50em' }
      ])
    ).toEqual([
      [
        { token: '>=', type: 'relational', value: 'min' },
        { token: 'width', type: 'ranged', value: 'width' },
        { token: '30em', type: 'unit', value: '30em' }
      ],
      [
        { token: '<=', type: 'relational', value: 'max' },
        { token: 'width', type: 'ranged', value: 'width' },
        { token: '50em', type: 'unit', value: '50em' }
      ]
    ]);
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
