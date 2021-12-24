import { keywords } from './keywords';
import { logicalOperators, relationalOperators } from './operators';
import { units } from './units';

export const mediaEnums = {
  ...keywords,
  logical: logicalOperators,
  relational: relationalOperators,
  unit: units
};

export const rangedMediaEnums = {
  ...keywords.ranged,
  ...relationalOperators
};

export { keywords, logicalOperators, relationalOperators, units };
