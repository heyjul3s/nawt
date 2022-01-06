export enum MediaDeviceQueryKeys {
  'landscape' = 'landscape',
  'portrait' = 'portrait',
  'fullscreen' = 'fullscreen',
  'standalone' = 'standalone',
  'minUI' = 'min-ui',
  'browser' = 'browser'
}

export type MediaDisplayQueries = {
  [MediaDeviceQueryKeys.browser]: DisplayModeBrowser;
  [MediaDeviceQueryKeys.fullscreen]: DisplayModeFullScreen;
  [MediaDeviceQueryKeys.minUI]: DisplayModeMinUI;
  [MediaDeviceQueryKeys.standalone]: DisplayModeStandalone;
  [MediaDeviceQueryKeys.landscape]: OrientationLandscape;
  [MediaDeviceQueryKeys.portrait]: OrientationPortrait;
};

export type DisplayModeBrowser = 'display-mode: browser';
export type DisplayModeFullScreen = 'display-mode: fullscreen';
export type DisplayModeMinUI = 'display-mode: minimal-ui';
export type DisplayModeStandalone = 'display-mode: standalone';
export type OrientationLandscape = 'orientation: landscape';
export type OrientationPortrait = 'orientation: portrait';

export const mediaDisplayQueries: MediaDisplayQueries = {
  [MediaDeviceQueryKeys.landscape]: 'orientation: landscape',
  [MediaDeviceQueryKeys.portrait]: 'orientation: portrait',
  [MediaDeviceQueryKeys.fullscreen]: 'display-mode: fullscreen',
  [MediaDeviceQueryKeys.standalone]: 'display-mode: standalone',
  [MediaDeviceQueryKeys.minUI]: 'display-mode: minimal-ui',
  [MediaDeviceQueryKeys.browser]: 'display-mode: browser'
};
