import isEmpty from 'lodash.isempty';
import styled from 'styled-components';

import {
  compose,
  background,
  border,
  color,
  display,
  layout,
  position,
  shadow,
  space,
  typography,
  variant,
  system,
} from 'styled-system';

import type { Config, VariantArgs, styleFn } from 'styled-system';
import type { CSSObject, StyledComponent } from 'styled-components';
import type { TStyledObjectProps, TStyledObject } from './typings';

export function styledObject<Props = void, ThemeType = void>(
  element: keyof JSX.IntrinsicElements | StyledComponent<keyof JSX.IntrinsicElements, any, any, keyof any>,
  styles: CSSObject,
  props: Partial<TStyledObjectProps> = { attrs: {}, compose: [], system: {}, variants: {} }
): TStyledObject<Props, ThemeType> {
  return styled(element).attrs(props.attrs)(
    styles,
    compose(
      background,
      border,
      color,
      display,
      layout,
      position,
      shadow,
      space,
      typography,
      ...props.compose as styleFn[]
    ),
    !isEmpty(props?.variants) && variant(props.variants as VariantArgs),
    !isEmpty(props?.system) && system(props.system as Config)
  );
}