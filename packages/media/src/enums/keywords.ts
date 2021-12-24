import { boundaryTypes } from './mediaBoundaries';
import { mediaAccessibilityQueries } from './mediaAccessibilty';
import { mediaDisplayQueries } from './mediaDisplay';
import { mediaInputQueries } from './mediaInput';
import { mediaTypeQueries } from './mediaTypes';

export const keywords = {
  // * statement - queries that require a single value
  statement: {
    ...mediaAccessibilityQueries,
    ...mediaDisplayQueries,
    ...mediaInputQueries,
    ...mediaTypeQueries
  },
  // * ranged - queries that accept a min, max or single value
  ranged: {
    ...boundaryTypes
  }
};
