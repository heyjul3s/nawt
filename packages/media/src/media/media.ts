import { css } from 'styled-components';
import { createMq } from './create-media-query';
import type { CSSObject } from 'styled-components'
import type { TMediaTypes } from '../typings';

export function mq(query: string, mediaType?: TMediaTypes) {
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

export function mqo(query: string, styles: CSSObject, mediaType: TMediaTypes = 'screen') {
  const mediaQuery = createMq(query, mediaType);

  return {
    [mediaQuery]: styles
  }
}
