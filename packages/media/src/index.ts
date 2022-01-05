import { media } from './media';

export { media };

export function mediaAll(query: string) {
  return media(query, 'all');
}

export function mediaScreen(query: string) {
  return media(query, 'screen');
}

export function mediaPrint(query: string) {
  return media(query, 'print');
}

export function mediaSpeech(query: string) {
  return media(query, 'speech');
}

export function mediaOnlyScreen(query: string) {
  return media(query, 'onlyScreen');
}

export function mediaOnlyPrint(query: string) {
  return media(query, 'onlyPrint');
}

export function mediaOnlySpeech(query: string) {
  return media(query, 'onlySpeech');
}

export { createMediaQuery } from './media';
