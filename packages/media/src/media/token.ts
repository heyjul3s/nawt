import { mediaEnums, rangedMediaEnums, units } from '../enums';
import { parseMediaQuery } from './parse';
import type { TToken, TTokenType,TRangedQueryToken } from '../typings';

export function tokenizeMediaQuery(queryValues: RegExpMatchArray[]): TToken[] {
  return queryValues?.reduce(
    (lexemes: TToken[], queryValue: RegExpMatchArray, i: number) => {
      const query = queryValue[0];
      const tokenType = findTokenParentKey(query);
      const tokenValue = parseMediaQuery(tokenType as TTokenType, query);

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

export function tokenizeRangedQuery(
  queryLexemes: string[]
): TRangedQueryToken[] {
  const unitRegexKeys = units.join('|');
  const UNIT_REGEX = new RegExp(`([0-9]+)(?:(${unitRegexKeys})|(\/[0-9]+))`);

  return queryLexemes.map(lexeme => {
    const tokenType = findTokenParentKey(lexeme);
    const value = rangedMediaEnums?.[lexeme];

    return {
      token: lexeme,
      type: tokenType as TTokenType,
      value: !value && lexeme.match(UNIT_REGEX) ? lexeme : value
    };
  });
}

export function findTokenParentKey(token: string): string | undefined {
  return Object.keys(mediaEnums).find(key => {
    const isUnitType = Object.keys(mediaEnums?.[key]).find(unit =>
      token.includes(unit)
    );

    return !!mediaEnums?.[key]?.[token] || !!isUnitType ? key : void 0;
  });
}
