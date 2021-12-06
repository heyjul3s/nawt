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
import type { ScalableCSSObject } from './typings';

type TStyledObject = {
  element: keyof JSX.IntrinsicElements;
  styles: ScalableCSSObject;
  props: Partial<{
    attrs: any;
    compose: styleFn[];
    variants: VariantArgs;
    system: Config;
  }>;
};

export function styledObject(
  element: keyof JSX.IntrinsicElements,
  styles: any,
  props = { attrs: {}, compose: [], system: {}, variants: {} }
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
      ...props.compose
    ),
    !isEmpty(props?.variants) && variant(props.variants),
    !isEmpty(props?.system) && system(props.system)
  );
}
