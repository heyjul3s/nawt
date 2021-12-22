import partition from 'lodash.partition';

import {
  keywords,
  relationalOperators,
  logicalOperators,
  units
} from '../enums';

type TokenType = 'ranged' | 'statement' | 'logical' | 'relational' | 'unit';

type TToken = {
  index: number;
  type: TokenType;
  token: string;
  value?: string;
};

const enums = {
  ...keywords,
  logical: logicalOperators,
  relational: relationalOperators,
  unit: units
};

export function media(query: string): TToken[] | string {
  if (!query) {
    return '';
  }

  const queryValue = removeExcessSpacings(query);
  const rangedQueryMatches = findRangedQueries(queryValue);
  const statementQueryMatches = findStatementQueries(queryValue);
  const queryMatches = [...rangedQueryMatches, ...statementQueryMatches];
  const queryExpressionTokens = tokenize(queryMatches);

  return parseQueryExpressionTokens(queryExpressionTokens);
}

export function parseQueryExpressionTokens(tokens) {
  return tokens?.length >= 1
    ? tokens
        .sort((a, b) => {
          return a.index - b.index;
        })
        .map(token =>
          token.type !== 'logical' ? `(${token.value})` : token.value
        )
        .join(' ')
    : '';
}

export function removeExcessSpacings(query: string): string {
  // * covers spaces, tabs, and newlines
  const SPACING_REGEX = /\s\s+/g;
  return !!query ? query.replace(SPACING_REGEX, ' ') : query;
}

export function findStatementQueries(query: string): RegExpMatchArray[] {
  const regexKeys = [...Object.keys(keywords.statement)].join('|');
  const regex = new RegExp(`(${regexKeys}|&&|!|:=|\\|\\|)*`, 'g');
  return matchQueries(query, regex);
}

export function findRangedQueries(query: string): RegExpMatchArray[] {
  const RANGE_QUERY_REGEX = /(?:(\d+)(rem|em|px|vh|vw)\s*?(>=|==|<=)\s*?)?((width|height|ratio|res)\s*?(>=|==|<=)\s*?(\d+)(rem|em|px|vh|vw))/g;
  return matchQueries(query, RANGE_QUERY_REGEX);
}

export function matchQueries(query: string, regex: RegExp): RegExpMatchArray[] {
  const matches = Array.from(query.matchAll(regex));
  return matches?.length >= 1 ? matches : [];
}

export function tokenize(queryValues: RegExpMatchArray[]): TToken[] {
  return queryValues.reduce(
    (lexemes: TToken[], queryValue: RegExpMatchArray, i: number) => {
      const token = queryValue[0];
      const tokenType = findTokenParentKey(token);
      const tokenValue = parseToken(tokenType, token);

      return !!tokenType
        ? [
            ...lexemes,
            {
              index: queryValue?.index || i,
              type: tokenType,
              value: tokenValue,
              token
            } as TToken
          ]
        : lexemes;
    },
    []
  );
}

export function parseToken(tokenType, token: string): string {
  const queryValue = enums?.[tokenType]?.[token];

  if (tokenType === 'unit') {
    return token;
  }

  if (tokenType === 'ranged') {
    return parseRangedQueryExpression(token);
  }

  if (!!queryValue) {
    return queryValue;
  }

  return '';
}

export function parseRangedQueryExpression(query: string): string {
  const queryLexemes = query?.trim()?.split(' ');
  const rangedTokens = tokenizeRanged(queryLexemes);
  const rangedQueryExpressionTokens = createRangedQueryTokens(rangedTokens);

  if (rangedQueryExpressionTokens?.length === 2) {
    return rangedQueryExpressionTokens
      .map(tokens => parseRangedQuery(tokens))
      .join(' and ');
  }

  if (rangedQueryExpressionTokens?.length === 3) {
    return parseRangedQuery(rangedQueryExpressionTokens as TToken[]);
  }

  return '';
}

export function parseRangedQuery(tokens: TToken[]): string {
  return tokens?.length >= 1
    ? tokens
        .map(token => {
          if (token.type === 'relational') {
            return `${token.value}-`;
          } else if (token.type === 'ranged') {
            return `${token.value}: `;
          } else {
            return token.value;
          }
        })
        .join('')
    : '';
}

export function tokenizeRanged(
  queryLexemes: string[]
): Omit<TToken, 'index'>[] {
  const UNIT_REGEX = /(\d+)(rem|em|px|vh|vw)/;

  const dict = {
    ...keywords.ranged,
    ...relationalOperators
  };

  return queryLexemes.map(lexeme => {
    const tokenType = findTokenParentKey(lexeme);
    const value = dict?.[lexeme];

    return {
      token: lexeme,
      type: tokenType as TokenType,
      value: !value && lexeme.match(UNIT_REGEX) ? lexeme : value
    };
  });
}

export function createRangedQueryTokens(tokens): TToken[][] | TToken[] {
  if (tokens?.length === 3) {
    return tokenizeRangedQueryStatement(tokens);
  }

  if (tokens?.length === 5) {
    return tokenizeMinMaxRangedQuery(tokens);
  }

  return [];
}

export function tokenizeRangedQueryStatement(tokens) {
  const typeSequence = ['ranged', 'relational', 'unit'];
  return sortBy(tokens, typeSequence, 'type');
}

export function tokenizeMinMaxRangedQuery(tokens) {
  const typeSequence = ['relational', 'ranged', 'unit'];
  const partitionedTokens = partition(tokens, ['type', 'ranged']);
  const queryType = partitionedTokens?.[0]?.[0];
  const queries = partitionedTokens[1];

  const chunked = queries.reduce((all, one, i) => {
    const chunk = Math.floor(i / 2);

    all[chunk] = sortBy(
      [].concat(all[chunk] || [queryType], one),
      typeSequence,
      'type'
    );

    return all;
  }, []);

  return chunked;
}

export function sortBy(array, order, key) {
  return array.sort((a, b) => {
    const A = a[key];
    const B = b[key];
    return order.indexOf(A) > order.indexOf(B) ? 1 : -1;
  });
}

export function findRangedQueryUnitType(query: string) {
  const unit = query?.match(/width|height|res|ratio/)?.[0];
  return !!unit ? keywords.ranged?.[unit] : '';
}

export function findTokenParentKey(token: string): string | undefined {
  return Object.keys(enums).find(key => {
    const isUnitType = Object.keys(enums?.[key]).find(unit =>
      token.includes(unit)
    );

    return !!enums?.[key]?.[token] || !!isUnitType ? key : void 0;
  });
}

export function deparenthesizeQuery(query: string): string {
  // * finds match of group within '(', ')' eg. '(pointerNone)' but includes '(', ')' in result
  const QUERY_GROUPED_BY_PARENTHESES_REGEX = /\((.*?)\)/g;
  // * mathces '(', ')' characters
  const PARENTHESES_REGEX = /(\(|\))/gim;

  return QUERY_GROUPED_BY_PARENTHESES_REGEX.test(query)
    ? query.replace(PARENTHESES_REGEX, '')
    : query;
}
