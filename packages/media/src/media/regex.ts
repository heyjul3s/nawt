import { keywords, relationalOperators, units } from '../enums';

const keywordKeys = Object.keys(keywords.statement).join('|');
const unitKeys = units.join('|');
const rangerQueryKeys = Object.keys(keywords.ranged).join('|');
const relationalOperatorKeys = Object.keys(relationalOperators).join('|');

const INT_OR_FLOAT = '([0-9]*[.])?[0-9]+';
const NUMERIC_UNIT = '[0-9]+(.|/)?[0-9]*';

export const regex = {
  // * finds match of group within '(', ')' eg. '(pointerNone)' but includes '(', ')' in result
  PARENTHESES_QUERY_GROUP: /\((.*?)\)/g,
  // * finds match 'width >= 50em', 'width == 50em' or '30em >= width <= 50em'
  RANGED_QUERY: new RegExp(
    `(${NUMERIC_UNIT}(${unitKeys})\\s?(${relationalOperatorKeys})\\s?)?(${rangerQueryKeys})\\s?(${relationalOperatorKeys})\\s?(${NUMERIC_UNIT}(${unitKeys}))`,
    'g'
  ),
  SPACING_TABS_NEWLINES: /\s\s+/g,
  STATEMENT_QUERY: new RegExp(`(${keywordKeys}|&&|!|:=|\\|\\|)+`, 'g'),
  UNIT: new RegExp(`(${INT_OR_FLOAT})(?:(${unitKeys})|(\/${INT_OR_FLOAT}))`),
  PARENTHESES: /(\(|\))/gi
};
