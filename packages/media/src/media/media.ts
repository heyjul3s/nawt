import { css } from 'styled-components';
import { createMediaQuery } from './create-media-query';
import type { TMediaTypes } from '../typings';

export function media(query: string, mediaType: TMediaTypes) {
  const mediaQuery = createMediaQuery(query, mediaType);

  return (first, ...interpolations) =>
    !!mediaQuery
      ? css`
          ${mediaQuery} {
            ${css(first, ...interpolations)}
          }
        `
      : css(first, ...interpolations);
}
