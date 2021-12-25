import {
  appendRelationalOperator,
  hyphenateRelationalOperator,
  isMinMaxTokenValue,
  isMinMaxQuery,
  parseRangedQueryExpression,
  parseRangedQuery,
  sortRangedQueryTokens,
  tokenizeRangedQuery
} from '../src/media/rangedMedia';

describe('parseRangedQueryExpression', () => {
  it('should return the appropriate ranged media queries', () => {
    expect(parseRangedQueryExpression('width >= 50em')).toEqual(
      'min-width: 50em'
    );

    expect(parseRangedQueryExpression('width <= 50em')).toEqual(
      'max-width: 50em'
    );

    expect(parseRangedQueryExpression('width == 30em')).toEqual('width: 30em');

    expect(parseRangedQueryExpression('30em >= width <= 50em')).toEqual(
      'min-width: 30em and max-width: 50em'
    );
  });

  it('should return the appropriate ranged statement media queries', () => {
    expect(parseRangedQueryExpression('ratio >= 8/5')).toEqual(
      'min-aspect-ratio: 8/5'
    );

    expect(parseRangedQueryExpression('ratio <= 3/2')).toEqual(
      'max-aspect-ratio: 3/2'
    );

    expect(parseRangedQueryExpression('ratio == 1/1')).toEqual(
      'aspect-ratio: 1/1'
    );

    expect(parseRangedQueryExpression('res >= 300dpi')).toEqual(
      'min-resolution: 300dpi'
    );
    expect(parseRangedQueryExpression('res <= 300dpi')).toEqual(
      'max-resolution: 300dpi'
    );
    expect(parseRangedQueryExpression('res == 300dpi')).toEqual(
      'resolution: 300dpi'
    );
  });
});

describe('tokenizeRangedQuery', () => {
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

describe('sortRangedQueryTokens', () => {
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
