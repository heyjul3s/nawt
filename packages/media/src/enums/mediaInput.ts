export enum MediaInputQueryKeys {
  'anyHover' = 'anyHover',
  'anyHoverNone' = 'anyHoverNone',
  'hover' = 'hover',
  'hoverNone' = 'hoverNone',
  'anyPointerCoarse' = 'anyPointerCoarse',
  'anyPointerFine' = 'anyPointerFine',
  'anyPointerNone' = 'anyPointerNone',
  'pointerCoarse' = 'pointerCoarse',
  'pointerFine' = 'pointerFine',
  'pointerNone' = 'pointerNone'
}

export type MediaInputQueries = {
  [MediaInputQueryKeys.anyHover]: AnyHover;
  [MediaInputQueryKeys.anyHoverNone]: AnyHoverNone;
  [MediaInputQueryKeys.anyPointerCoarse]: AnyPointerCoarse;
  [MediaInputQueryKeys.anyPointerFine]: AnyPointerFine;
  [MediaInputQueryKeys.anyPointerNone]: AnyPointerNone;
  [MediaInputQueryKeys.hover]: Hover;
  [MediaInputQueryKeys.hoverNone]: HoverNone;
  [MediaInputQueryKeys.pointerNone]: PointerNone;
  [MediaInputQueryKeys.pointerCoarse]: PointerCoarse;
  [MediaInputQueryKeys.pointerFine]: PointerFine;
};

export type AnyHover = 'any-hover: hover';
export type AnyHoverNone = 'any-hover: none';
export type AnyPointerCoarse = 'any-pointer: coarse';
export type AnyPointerFine = 'any-pointer: fine';
export type AnyPointerNone = 'any-pointer: none';
export type DisplayModeBrowser = 'display-mode: browser';
export type DisplayModeFullScreen = 'display-mode: fullscreen';
export type DisplayModeMinUI = 'display-mode: minimal-ui';
export type DisplayModeStandalone = 'display-mode: standalone';
export type Hover = 'hover: hover';
export type HoverNone = 'hover: none';
export type OrientationLandscape = 'orientation: landscape';
export type OrientationPortrait = 'orientation: portrait';
export type PointerNone = 'pointer: none';
export type PointerCoarse = 'pointer: coarse';
export type PointerFine = 'pointer: fine';

export const mediaInputQueries: MediaInputQueries = {
  [MediaInputQueryKeys.anyHover]: 'any-hover: hover',
  [MediaInputQueryKeys.anyHoverNone]: 'any-hover: none',
  [MediaInputQueryKeys.hover]: 'hover: hover',
  [MediaInputQueryKeys.hoverNone]: 'hover: none',
  [MediaInputQueryKeys.anyPointerCoarse]: 'any-pointer: coarse',
  [MediaInputQueryKeys.anyPointerFine]: 'any-pointer: fine',
  [MediaInputQueryKeys.anyPointerNone]: 'any-pointer: none',
  [MediaInputQueryKeys.pointerNone]: 'pointer: none',
  [MediaInputQueryKeys.pointerCoarse]: 'pointer: coarse',
  [MediaInputQueryKeys.pointerFine]: 'pointer: fine'
};
