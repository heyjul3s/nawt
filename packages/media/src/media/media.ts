import {
  keywords,
  relationalOperators,
  logicalOperators,
  units
} from '../enums';

type TokenType = 'ranged' | 'statement' | 'logical' | 'relational' | 'unit';

type TToken = {
  index: number;
  type: TokenType;
  token: string;
  value?: string;
};

const enums = {
  ...keywords,
  logical: logicalOperators,
  relational: relationalOperators,
  unit: units
};

export function media(query: string): TToken[] | string {
  const queryValue = removeExcessSpacings(query);
  const rangedQueryMatches = findRangedQueries(queryValue);
  const statementQueryMatches = findStatementQueries(queryValue);
  const queryMatches = [...rangedQueryMatches, ...statementQueryMatches];

  return '';
}

export function removeExcessSpacings(query: string): string {
  // * covers spaces, tabs, and newlines
  const SPACING_REGEX = /\s\s+/g;
  return !!query ? query.replace(SPACING_REGEX, ' ') : query;
}

export function findStatementQueries(query: string): RegExpMatchArray[] {
  const regexKeys = [...Object.keys(keywords.statement)].join('|');
  const regex = new RegExp(`(${regexKeys}|&&|!|:=)*`, 'g');
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

      return !!tokenType
        ? [
            ...lexemes,
            {
              index: queryValue?.index || i,
              type: tokenType,
              value: tokenType !== 'unit' ? enums?.[tokenType]?.[token] : token,
              token
            } as TToken
          ]
        : lexemes;
    },
    []
  );
}

export function findRangedQueryUnitType(query: string) {
  const unit = query?.match(/width|height|res|ratio/)?.[0];
  return !!unit ? keywords.ranged?.[unit] : '';
}

export function findTokenParentKey(token: string): string | undefined {
  return Object.keys(enums).find(key => {
    const isUnitType = Object.keys(enums?.[key]).find(unit =>
      token.includes(unit)
    );

    return !!enums?.[key]?.[token] || !!isUnitType ? key : void 0;
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
