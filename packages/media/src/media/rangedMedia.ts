import partition from 'lodash.partition';
import { rangedMediaEnums, units } from '../enums';
import { findTokenParentKey, sortBy } from './utils';
import type { TToken, TTokenType, TRangedQueryToken } from './typings'

export function parseRangedQueryExpression(query: string): string {
  const queryLexemes = query?.trim()?.split(' ');
  const rangedTokens = tokenizeRangedQuery(queryLexemes);
  const sortedRangedTokens = sortRangedQueryTokens(rangedTokens);

  if (sortedRangedTokens?.length === 2) {
    return sortedRangedTokens
      .map(tokens => parseRangedQuery(tokens))
      .join(' and ');
  }

  if (sortedRangedTokens?.length === 3) {
    return parseRangedQuery(sortedRangedTokens as TToken[]);
  }

  return '';
}

export function tokenizeRangedQuery(
  queryLexemes: string[]
): TRangedQueryToken[] {
  const unitRegexKeys = units.join('|')
  const UNIT_REGEX = new RegExp(`([0-9]+)(?:(${unitRegexKeys})|(\/[0-9]+))`);

  return queryLexemes.map(lexeme => {
    const tokenType = findTokenParentKey(lexeme);
    const value = rangedMediaEnums?.[lexeme];

    return {
      token: lexeme,
      type: tokenType as TTokenType,
      value: !value && lexeme.match(UNIT_REGEX) ? lexeme : value
    };
  });
}

export function parseRangedQuery(tokens: TRangedQueryToken[]): string {
  const tokensLength = tokens?.length || 0;
  const isRangedQuery = isMinMaxQuery(tokens);

  return tokens?.length >= 1
    ? tokens
        .map((token, i) => {
          const prev = tokens[(i + tokensLength - 1) % tokensLength];
          const next = tokens[(i + 1) % tokensLength];

          if (token.type === 'relational') {
            return hyphenateRelationalOperator(token);
          } else if (token.type === 'ranged') {
            const siblingToken = isRangedQuery
              ? prev 
              : next;

            return appendRelationalOperator(token, siblingToken)
          } else {
            return token.value;
          }
        })
        .join('')
    : '';
}

export function hyphenateRelationalOperator(token: TRangedQueryToken) {
  if (!token) {
    return '';
  }

  return isMinMaxTokenValue(token) ? `${token.value}-` : `${token.value} `;
}

export function appendRelationalOperator(
  token: TRangedQueryToken,
  comparatorToken: TRangedQueryToken
) {
  if (!token) {
    return '';
  }

  return !comparatorToken || isMinMaxTokenValue(comparatorToken)
    ? `${token.value}: `
    : token.value;
}

export function isMinMaxTokenValue(token: TRangedQueryToken) {
  return token?.value === 'min' || token?.value === 'max';
}

export function sortRangedQueryTokens(tokens): TRangedQueryToken[][] | TRangedQueryToken[] {
  if (tokens?.length === 5) {
    return sortMinMaxRangedQuery(tokens);
  }

  if (tokens?.length === 3) {
    return sortRangedQueryStatement(tokens);
  }

  return [];
}

export function isMinMaxQuery(tokens: TRangedQueryToken[]) {
  return !!tokens?.filter(token => token.token === '>=' || token.token === '<=')
    ?.length;
}

export function sortRangedQueryStatement(tokens: TRangedQueryToken[]) {
  const typeSequence = isMinMaxQuery(tokens)
    ? ['relational', 'ranged', 'unit']
    : ['ranged', 'relational', 'unit'];
    
  return sortBy(tokens, typeSequence, 'type');
}

export function sortMinMaxRangedQuery(tokens: TRangedQueryToken[]) {
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