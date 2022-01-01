import isEmpty from 'lodash.isempty';
import { styleFn } from 'styled-system';
import { isStyledComponent } from 'styled-components';
import { styledObject } from './styled-object';

import type { VariantArgs, Config} from 'styled-system'

export type TStyledSetConfig = Partial<{
  baseStyles: any;
  components: any;
  attrs: any;
  as: keyof JSX.IntrinsicElements;
  compose: styleFn[];
  variants: VariantArgs;
  system: Config;
}>;

export function styledSet(
  baseElement: keyof JSX.IntrinsicElements,
  config: TStyledSetConfig
) {
  const StyledBase = !isEmpty(config.baseStyles)
    ? styledObject(baseElement, config.baseStyles)
    : void 0;

  return Object.entries(config.components).reduce((components, config) => {
    const [name, props] = config;

    const {
      as = 'div',
      compose,
      variants,
      system,
      attrs,
      ...styles
    } = props as TStyledSetConfig;

    const BaseElement = isStyledComponent(StyledBase) ? StyledBase : as;

    return {
      ...components,
      [name]: styledObject(BaseElement, {...styles}, {
        attrs,
        compose,
        variants,
        system
      })
    };
  }, {});
}
