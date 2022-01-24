import { prepareQuery } from './prepare-query';
import { findQueryMatches } from './matchers';
import { tokenizeMediaQuery } from './token';
import { regex } from './regex';
import { mediaTypeQueries } from '../enums';

import type { TCreateMediaQueries, TMediaTypes, TToken } from '../typings';

export function createMqs(queries: TCreateMediaQueries[]) {
  return queries.reduce((mediaQueries, { key, query, mediaType }) => {
    return {
      ...mediaQueries,
      [key]: createMq(query, mediaType)
    };
  }, {});
}

export function createMq(query: string, mediaType?: TMediaTypes): string {
  if (!query) {
    return '';
  }

  const queryValue = prepareQuery(query);
  const queryMatches = findQueryMatches(queryValue);
  const queryExpressionTokens = tokenizeMediaQuery(queryMatches);

  const mediaQuery = createMediaQueryType(mediaType);
  const mediaQueryExpression = renderMediaQuery(queryExpressionTokens);

  return queryMatches?.length >= 1
    ? `${mediaQuery} ${mediaQueryExpression}`
    : `${mediaQuery} ${query}`;
}

export function createMediaQueryType(mediaType?: TMediaTypes) {
  const type = mediaType as TMediaTypes;
  const mediaDeviceType = mediaTypeQueries?.[type];

  return !!mediaDeviceType ? `@media ${mediaDeviceType} and` : '@media';
}

export function renderMediaQuery(tokens: TToken[]): string {
  return tokens?.length >= 1
    ? tokens
        .sort((a, b) => a.index - b.index)
        .map((token) => {
          return token.type !== 'logical' &&
            !token?.value?.match(regex.PARENTHESES)
            ? `(${token.value})`
            : token.value;
        })
        .join(' ')
    : '';
}
