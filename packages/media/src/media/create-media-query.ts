import { prepareQuery } from './prepare-query';
import { findQueryMatches } from './matchers';
import { tokenizeMediaQuery } from './token';
import type { TToken } from '../typings';

export function createMediaQuery(query: string): TToken[] | string {
  const queryValue = prepareQuery(query);
  const queryMatches = findQueryMatches(queryValue);
  const queryExpressionTokens = tokenizeMediaQuery(queryMatches);

  return !!queryMatches
    ? renderMediaQuery(queryExpressionTokens)
    : query;
}

export function renderMediaQuery(tokens: TToken[]): string {
  const PARENTHESES_REGEX = /(\(|\))/gi;

  return tokens?.length >= 1
    ? tokens
        .sort((a, b) => a.index - b.index)
        .map(token => {
          return token.type !== 'logical' &&
            !token?.value?.match(PARENTHESES_REGEX)
              ? `(${token.value})`
              : token.value;
        })
        .join(' ')
    : '';
}
