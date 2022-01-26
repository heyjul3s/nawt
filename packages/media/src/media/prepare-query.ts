import { regex } from './regex';

export function prepareQuery(query: string) {
  const deparenthesizedQuery = deparenthesizeQuery(query);
  return removeExcessSpacings(deparenthesizedQuery);
}

export function deparenthesizeQuery(query: string): string {
  return regex.PARENTHESES_QUERY_GROUP.test(query)
    ? query.replace(regex.PARENTHESES, '')
    : query;
}

export function removeExcessSpacings(query: string): string {
  return !!query ? query.replace(regex.SPACING_TABS_NEWLINES, ' ') : query;
}
