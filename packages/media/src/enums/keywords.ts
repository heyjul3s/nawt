import { boundaryTypes } from './mediaBoundaries';
import { mediaAccessibilityQueries } from './mediaAccessibilty';
import { mediaDisplayQueries } from './mediaDisplay';
import { mediaInputQueries } from './mediaInput';
import { mediaTypeQueries } from './mediaTypes';

export const keywords = {
  constant: {
    ...mediaAccessibilityQueries,
    ...mediaDisplayQueries,
    ...mediaInputQueries,
    ...mediaTypeQueries
  },
  ranged: {
    ...boundaryTypes
  },
  statement: {}
};
