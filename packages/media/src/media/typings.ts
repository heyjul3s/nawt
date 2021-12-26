import { MediaTypeKeys, mediaTypeQueries } from '../enums';

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
