import { renderRangedQuery } from './render';
import { mediaEnums } from '../enums';
import { isMinMaxTokenValue, isMinMaxQuery } from './utils';
import type { TTokenType, TRangedQueryToken } from '../typings';

export function parseMediaQuery(tokenType: TTokenType, query: string): string {
  const queryValue = mediaEnums?.[tokenType]?.[query];

  if (tokenType === 'unit') {
    return query;
  }

  if (tokenType === 'ranged') {
    return renderRangedQuery(query);
  }

  if (!!queryValue) {
    return queryValue;
  }

  return '';
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
            const siblingToken = isRangedQuery ? prev : next;

            return appendRelationalOperator(token, siblingToken);
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
