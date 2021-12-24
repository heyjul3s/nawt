import { mediaEnums, keywords } from '../enums';

export function sortBy(array, order, key) {
  return array.sort((a, b) => {
    const A = a[key];
    const B = b[key];
    return order.indexOf(A) > order.indexOf(B) ? 1 : -1;
  });
}

export function findRangedQueryUnitType(query: string) {
  const unit = query?.match(/width|height|res|ratio/)?.[0];
  return !!unit ? keywords.ranged?.[unit] : '';
}

export function findTokenParentKey(token: string): string | undefined {
  return Object.keys(mediaEnums).find(key => {
    const isUnitType = Object.keys(mediaEnums?.[key]).find(unit =>
      token.includes(unit)
    );
    ``;

    return !!mediaEnums?.[key]?.[token] || !!isUnitType ? key : void 0;
  });
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
