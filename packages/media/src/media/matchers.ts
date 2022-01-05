import { keywords } from '../enums';

export function findQueryMatches(query) {
  const rangedQueryMatches = findRangedQueries(query);
  const statementQueryMatches = findStatementQueries(query);

  return [...rangedQueryMatches, ...statementQueryMatches];
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
