import { MediaBoundaries } from './enums/mediaBoundaries';
import { MediaInputQueries } from './enums/mediaInput';
import { MediaTypes } from './enums/mediaTypes';
import { MediaAccessibilityQueries } from './enums/mediaAccessibilty';
import { MediaDisplayQueries } from './enums/mediaDisplay';

export type Media = MediaBoundaries & MediaQueries;

export type MediaQueries = MediaInputQueries &
  MediaTypes &
  MediaAccessibilityQueries &
  MediaDisplayQueries;
