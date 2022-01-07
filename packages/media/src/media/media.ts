import { css } from 'styled-components';
import { createMq } from './create-media-query';
import type { TMediaTypes } from '../typings';

export function mq(query: string, mediaType: TMediaTypes) {
  const mediaQuery = createMq(query, mediaType);

  return (first, ...interpolations) =>
    !!mediaQuery
      ? css`
          ${mediaQuery} {
            ${css(first, ...interpolations)}
          }
        `
      : css(first, ...interpolations);
}
