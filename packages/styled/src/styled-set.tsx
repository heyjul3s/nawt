import isEmpty from 'lodash.isempty';
import { styleFn } from 'styled-system';
import { CSSObject, isStyledComponent } from 'styled-components';
import { styledObject } from './styled-object';

import type { VariantArgs, Config } from 'styled-system';
import type { TStyledObject } from './typings';

export type TStyledSetConfig = {
  base: {
    styles: CSSObject;
    element: keyof JSX.IntrinsicElements
  };
  components: Record<string, TComponent>;
  attrs?: any;
  compose?: styleFn[];
  variants?: VariantArgs;
  system?: Config;
};

type TComponent = Partial<{
  attrs: any;
  as: keyof JSX.IntrinsicElements;
  compose: styleFn[];
  variants: VariantArgs;
  system: Config;
}> & CSSObject;

export function styledSet(config: TStyledSetConfig) {
  const StyledBase = !isEmpty(config.base)
    ? styledObject(config.base?.element || 'div', config.base?.styles || {})
    : void 0;

  return Object.entries(config.components).reduce((components, config) => {
    const [name, props] = config;

    const {
      as = 'div',
      compose = [],
      variants = {},
      system = {},
      attrs = {},
      ...styles
    } = props as TComponent;


    const BaseElement = !!as ? as : isStyledComponent(StyledBase) ? StyledBase : 'div';

    return {
      ...components,
      [name]: styledObject(BaseElement, {...styles}, {
        compose,
        variants,
        system,
        attrs
      })
    };
  }, {} as Record<string, TStyledObject>);
}
