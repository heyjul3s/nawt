import { isMinMaxTokenValue, isMinMaxQuery } from '../../src/media/utils';

describe('isMinMaxQuery - evaluates if a an array of tokens is a min/max type query', () => {
  it('should returns false if a token is NOT of ">=" or "<=" value', () => {
    expect(
      isMinMaxQuery([
        { token: 'width', type: 'ranged', value: 'width' },
        { token: '==', type: 'relational', value: ':' },
        { token: '30em', type: 'unit', value: '30em' }
      ])
    ).toEqual(false);
  });

  it('should return true if a token is of ">=" or "<=" value', () => {
    expect(
      isMinMaxQuery([
        { token: 'width', type: 'ranged', value: 'width' },
        { token: '>=', type: 'relational', value: ':' },
        { token: '30em', type: 'unit', value: '30em' }
      ])
    ).toEqual(true);

    expect(
      isMinMaxQuery([
        { token: 'width', type: 'ranged', value: 'width' },
        { token: '<=', type: 'relational', value: ':' },
        { token: '30em', type: 'unit', value: '30em' }
      ])
    ).toEqual(true);
  });
});

describe('isMinMaxTokenValue', () => {
  it('should return false if the token is not a min/max value', () => {
    expect(
      isMinMaxTokenValue({ token: '==', type: 'relational', value: ':' })
    ).toEqual(false);
  });

  it('should return true if the token value is of "min" or "max" value', () => {
    expect(
      isMinMaxTokenValue({ token: '>=', type: 'relational', value: 'min' })
    ).toEqual(true);

    expect(
      isMinMaxTokenValue({ token: '<=', type: 'relational', value: 'max' })
    ).toEqual(true);
  });
});
