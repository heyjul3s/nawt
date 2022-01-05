import { MediaBoundaries } from './enums/media-boundaries';
import { MediaInputQueries } from './enums/media-input';
import { MediaTypes } from './enums/media-types';
import { MediaAccessibilityQueries } from './enums/media-accessibilty';
import { MediaDisplayQueries } from './enums/media-display';

export type Media = MediaBoundaries & MediaQueries;

export type MediaQueries = MediaInputQueries &
  MediaTypes &
  MediaAccessibilityQueries &
  MediaDisplayQueries;

export type TTokenType =
  | 'ranged'
  | 'statement'
  | 'logical'
  | 'relational'
  | 'unit';

export type TToken = {
  index: number;
  type: TTokenType;
  token: string;
  value?: string;
};

export type TRangedQueryToken = Omit<TToken, 'index'>;

export type TMediaTypes =
  | 'all'
  | 'screen'
  | 'onlyScreen'
  | 'speech'
  | 'onlySpeech'
  | 'print'
  | 'onlyPrint';
