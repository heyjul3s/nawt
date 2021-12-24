import { parseRangedQueryExpression } from './rangedMedia';
import { mediaEnums, keywords } from '../enums';
import { findTokenParentKey } from './utils';
import type { TToken } from './typings'

export function media(query: string): TToken[] | string {
  if (!query) {
    return '';
  }

  const queryValue = removeExcessSpacings(query);
  const rangedQueryMatches = findRangedQueries(queryValue);
  const statementQueryMatches = findStatementQueries(queryValue);
  const queryExpressionTokens = tokenize([...rangedQueryMatches, ...statementQueryMatches]);

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

export function removeExcessSpacings(query: string): string {
  // * covers spaces, tabs, and newlines
  const SPACING_REGEX = /\s\s+/g;
  return !!query ? query.replace(SPACING_REGEX, ' ') : query;
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
  const queryValue = mediaEnums?.[tokenType]?.[token];

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
