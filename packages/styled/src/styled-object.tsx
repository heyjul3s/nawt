import isEmpty from 'lodash.isempty';
import styled from 'styled-components';
import css from '@styled-system/css';

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

import type {
  TScalableCSSObject,
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
  styles: TScalableCSSObject,
  props: Partial<TStyledObjectProps> = {
    attrs: {},
    compose: [],
    system: {},
    variants: {}
  }
): TStyledObject<Props, ThemeType> {
  const composition = props?.compose || ([] as styleFn[]);

  return styled(element).attrs(props.attrs || {})(
    css(styles),
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
