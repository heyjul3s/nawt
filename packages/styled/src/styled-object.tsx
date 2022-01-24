import isEmpty from 'lodash.isempty';
import styled from 'styled-components';

import {
  compose,
  background,
  border,
  color,
  display,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space,
  typography,
  variant,
  system
} from 'styled-system';

import type { Config, VariantArgs, styleFn } from 'styled-system';
import type { CSSObject } from 'styled-components';

import type {
  TStyledElement,
  TStyledObjectProps,
  TStyledObject
} from './typings';

export const typographyStyleProps: Config = {
  textDecoration: true,
  textIndent: true,
  textTransform: true,
  textOverflow: true,
  whiteSpace: true,
  wordBreak: true,
  wordSpacing: true
};

export function styledObject<Props = void, ThemeType = void>(
  element: TStyledElement,
  styles: CSSObject,
  props: Partial<TStyledObjectProps> = {
    attrs: {},
    compose: [],
    system: {},
    variants: {}
  }
): TStyledObject<Props, ThemeType> {
  const composition = props?.compose || ([] as styleFn[]);

  return styled(element).attrs(props.attrs || {})(
    styles,
    compose(
      background,
      border,
      color,
      display,
      flexbox,
      grid,
      layout,
      position,
      shadow,
      space,
      typography,
      ...composition
    ),
    !isEmpty(props?.variants) && variant(props.variants as VariantArgs),
    !isEmpty(props?.system) &&
      system({ ...typographyStyleProps, ...(props.system as Config) })
  );
}
