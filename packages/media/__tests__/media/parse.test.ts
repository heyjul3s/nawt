import {
  appendRelationalOperator,
  hyphenateRelationalOperator,
  parseRangedQuery
} from '../../src/media/parse';

describe('parseRangedQuery', () => {
  it('should return an empty string if provided value is invalid', () => {
    expect(parseRangedQuery([] as any)).toEqual('');
    expect(parseRangedQuery(void 0 as any)).toEqual('');
  });

  it('should parse and return a media query string', () => {
    expect(
      parseRangedQuery([
        { token: '>=', type: 'relational', value: 'min' },
        { token: 'res', type: 'ranged', value: 'resolution' },
        { token: '300dpi', type: 'unit', value: '300dpi' }
      ] as any)
    ).toEqual('min-resolution: 300dpi');

    expect(
      parseRangedQuery([
        { token: 'width', type: 'ranged', value: 'width' },
        { token: '==', type: 'relational', value: ':' },
        { token: '30em', type: 'unit', value: '30em' }
      ] as any)
    ).toEqual('width: 30em');
  });
});

describe('hyphenateRelationalOperator', () => {
  it('should return an empty string if provided an invalid value', () => {
    expect(hyphenateRelationalOperator('' as any)).toEqual('');
    expect(hyphenateRelationalOperator(void 0 as any)).toEqual('');
  });

  it('should return a hyphenated string value of "min-"', () => {
    expect(
      hyphenateRelationalOperator({
        token: '>=',
        type: 'relational',
        value: 'min'
      } as any)
    ).toEqual('min-');
  });

  it('should return a hyphenated string value of "max-"', () => {
    expect(
      hyphenateRelationalOperator({
        token: '<=',
        type: 'relational',
        value: 'max'
      } as any)
    ).toEqual('max-');
  });

  it('should return a string of ": " if provided an equals operator token', () => {
    expect(
      hyphenateRelationalOperator({
        token: '==',
        type: 'relational',
        value: ':'
      } as any)
    ).toEqual(': ');
  });

  it('should return a token value as is if not min nor max token value', () => {
    expect(
      hyphenateRelationalOperator({
        token: 'width',
        type: 'ranged',
        value: 'width'
      } as any)
    ).toEqual('width ');
  });
});

describe('appendRelationalOperator', () => {
  it('should return ranged token value as is  if NOT provided a min/max token', () => {
    expect(
      appendRelationalOperator(
        { token: 'width', type: 'ranged', value: 'width' },
        { token: '==', type: 'relational', value: ':' }
      )
    ).toEqual('width');
  });

  it('should return a value of "width: " if provided a min/max token', () => {
    expect(
      appendRelationalOperator(
        { token: 'width', type: 'ranged', value: 'width' },
        { token: '>=', type: 'relational', value: 'min' }
      )
    ).toEqual('width: ');
  });
});
