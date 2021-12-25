import { css } from 'styled-components';
import { parseRangedQueryExpression } from './rangedMedia';
import { mediaEnums, keywords, mediaTypeQueries } from '../enums';
import { findTokenParentKey } from './utils';
import type { TToken, TMediaTypes } from './typings';

export function media(query: string, mediaType: TMediaTypes) {
  const mediaqueryExpression = createMediaQuery(query);
  const mediaDeviceType = mediaTypeQueries?.[mediaType];
  const mediaQuery = !!mediaDeviceType ? `@media ${mediaDeviceType}` : '@media';

  return (first, ...interpolations) =>
    !!mediaqueryExpression
      ? css`
          ${mediaQuery} ${mediaqueryExpression} {
            ${css(first, ...interpolations)}
          }
        `
      : css(first, ...interpolations);
}

export function createMediaQuery(query: string): TToken[] | string {
  if (!query) {
    return '';
  }

  const queryValue = prepareQuery(query);
  const queryMatches = findQueryMatches(queryValue);
  const queryExpressionTokens = tokenize(queryMatches);

  return parseQueryExpressionTokens(queryExpressionTokens);
}

export function parseQueryExpressionTokens(tokens) {
  return tokens?.length >= 1
    ? tokens
        .sort((a, b) => a.index - b.index)
        .map(token =>
          token.type !== 'logical' ? `(${token.value})` : token.value
        )
        .join(' ')
    : '';
}

export function prepareQuery(query: string) {
  const deparenthesizedQuery = deparenthesizeQuery(query);
  return removeExcessSpacings(deparenthesizedQuery);
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

export function removeExcessSpacings(query: string): string {
  // * covers spaces, tabs, and newlines
  const SPACING_REGEX = /\s\s+/g;
  return !!query ? query.replace(SPACING_REGEX, ' ') : query;
}

export function findQueryMatches(query) {
  const rangedQueryMatches = findRangedQueries(query);
  const statementQueryMatches = findStatementQueries(query);

  return [...rangedQueryMatches, ...statementQueryMatches]
}

export function findStatementQueries(query: string): RegExpMatchArray[] {
  const regexKeys = Object.keys(keywords.statement).join('|');
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
      const query = queryValue[0];
      const tokenType = findTokenParentKey(query);
      const tokenValue = parseToken(tokenType, query);

      return !!tokenType
        ? [
            ...lexemes,
            {
              index: queryValue?.index || i,
              type: tokenType,
              value: tokenValue,
              token: query
            } as TToken
          ]
        : lexemes;
    },
    []
  );
}

export function parseToken(tokenType, query: string): string {
  const queryValue = mediaEnums?.[tokenType]?.[query];

  if (tokenType === 'unit') {
    return query;
  }

  if (tokenType === 'ranged') {
    return parseRangedQueryExpression(query);
  }

  if (!!queryValue) {
    return queryValue;
  }

  return '';
}
