import { boundaryTypes } from './media-boundaries';
import { mediaAccessibilityQueries } from './media-accessibilty';
import { mediaDisplayQueries } from './media-display';
import { mediaInputQueries } from './media-input';
import { mediaTypeQueries } from './media-types';

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
