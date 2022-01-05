import { css } from 'styled-components';
import { createMediaQuery } from './create-media-query';
import { mediaTypeQueries } from '../enums';
import type { TMediaTypes } from '../typings';

// TODO: test if works with styled object
export function media(query: string, mediaType: TMediaTypes) {
  const mediaqueryExpression = createMediaQuery(query);
  const mediaDeviceType = mediaTypeQueries?.[mediaType];
  const mediaQuery = !!mediaDeviceType ? `@media ${mediaDeviceType}` : '@media';

  return (first, ...interpolations) =>
    !!mediaqueryExpression
      ? css`
          ${mediaQuery} ${mediaqueryExpression} {
            ${css(first, ...interpolations)}
          }
        `
      : css(first, ...interpolations);
}
