import { findTokenParentKey, tokenizeRangedQuery } from '../../src/media/token';

describe('tokenizeRangedQuery - converts ranged media query lexemes to tokens', () => {
  it('should tokenize range type of width', () => {
    expect(tokenizeRangedQuery(['width', '==', '30em'])).toEqual([
      { token: 'width', type: 'ranged', value: 'width' },
      { token: '==', type: 'relational', value: ':' },
      { token: '30em', type: 'unit', value: '30em' }
    ]);

    expect(tokenizeRangedQuery(['width', '>=', '30em'])).toEqual([
      { token: 'width', type: 'ranged', value: 'width' },
      { token: '>=', type: 'relational', value: 'min' },
      { token: '30em', type: 'unit', value: '30em' }
    ]);

    expect(tokenizeRangedQuery(['30em', '>=', 'width', '<=', '50em'])).toEqual([
      { token: '30em', type: 'unit', value: '30em' },
      { token: '>=', type: 'relational', value: 'min' },
      { token: 'width', type: 'ranged', value: 'width' },
      { token: '<=', type: 'relational', value: 'max' },
      { token: '50em', type: 'unit', value: '50em' }
    ]);
  });
});

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
