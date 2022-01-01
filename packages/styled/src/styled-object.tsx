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
  styleFn,
} from 'styled-system';

import type { Config, VariantArgs } from 'styled-system';
import type { CSSObject, StyledComponent } from 'styled-components'

export type TStyledObjectProps = {
  attrs: any;
  compose: styleFn[];
  variants: VariantArgs;
  system: Config;
};

export function styledObject(
  element: keyof JSX.IntrinsicElements | StyledComponent<keyof JSX.IntrinsicElements, any, any, keyof any>,
  styles: CSSObject,
  props: Partial<TStyledObjectProps> = { attrs: {}, compose: [], system: {}, variants: {} }
) {
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
      ...props.compose as TStyledObjectProps["compose"]
    ),
    !isEmpty(props?.variants) && variant(props.variants as TStyledObjectProps["variants"]),
    !isEmpty(props?.system) && system(props.system as TStyledObjectProps["system"])
  );
}
