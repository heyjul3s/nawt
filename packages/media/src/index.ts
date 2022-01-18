import { mq } from './media';

export { mq };
export { mqo } from './media';

export function mqAll(query: string) {
  return mq(query, 'all');
}

export function mqScreen(query: string) {
  return mq(query, 'screen');
}

export function mqPrint(query: string) {
  return mq(query, 'print');
}

export function mqSpeech(query: string) {
  return mq(query, 'speech');
}

export function mqOnlyScreen(query: string) {
  return mq(query, 'onlyScreen');
}

export function mqOnlyPrint(query: string) {
  return mq(query, 'onlyPrint');
}

export function mqOnlySpeech(query: string) {
  return mq(query, 'onlySpeech');
}

export { createMq } from './media';
