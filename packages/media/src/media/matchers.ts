import { regex } from './regex';

export function findQueryMatches(query) {
  const rangedQueryMatches = findRangedQueries(query);
  const statementQueryMatches = findStatementQueries(query);

  return [...rangedQueryMatches, ...statementQueryMatches];
}

export function findStatementQueries(query: string): RegExpMatchArray[] {
  return matchQueries(query, regex.STATEMENT_QUERY);
}

export function findRangedQueries(query: string): RegExpMatchArray[] {
  return matchQueries(query, regex.RANGED_QUERY);
}

export function matchQueries(query: string, regex: RegExp): RegExpMatchArray[] {
  const matches = Array.from(query.matchAll(regex));
  return matches?.length >= 1 ? matches : [];
}
