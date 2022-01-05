export function prepareQuery(query: string) {
  const deparenthesizedQuery = deparenthesizeQuery(query);
  return removeExcessSpacings(deparenthesizedQuery);
}

export function deparenthesizeQuery(query: string): string {
  // * finds match of group within '(', ')' eg. '(pointerNone)' but includes '(', ')' in result
  const QUERY_GROUPED_BY_PARENTHESES_REGEX = /\((.*?)\)/g;
  // * mathces '(', ')' characters
  const PARENTHESES_REGEX = /(\(|\))/gi;

  return QUERY_GROUPED_BY_PARENTHESES_REGEX.test(query)
    ? query.replace(PARENTHESES_REGEX, '')
    : query;
}

export function removeExcessSpacings(query: string): string {
  // * covers spaces, tabs, and newlines
  const SPACING_REGEX = /\s\s+/g;
  return !!query ? query.replace(SPACING_REGEX, ' ') : query;
}
