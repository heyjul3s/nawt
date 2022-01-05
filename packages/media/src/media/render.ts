import type { TToken } from '../typings';
import { tokenizeRangedQuery } from './token';
import { parseRangedQuery } from './parse'
import { sortRangedQueryTokens } from './sort';

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

export function renderRangedQuery(query: string): string {
  const queryLexemes = query?.trim()?.split(' ');
  const rangedTokens = tokenizeRangedQuery(queryLexemes);
  const sortedRangedTokens = sortRangedQueryTokens(rangedTokens);

  if (sortedRangedTokens?.length === 2) {
    return sortedRangedTokens
      .map(tokens => `(${parseRangedQuery(tokens)})`)
      .join(' and ');
  }

  if (sortedRangedTokens?.length === 3) {
    return parseRangedQuery(sortedRangedTokens as TToken[]);
  }

  return '';
}
