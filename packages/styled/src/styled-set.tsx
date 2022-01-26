import { isStyledComponent } from 'styled-components';
import { styledObject } from './styled-object';

import type {
  TStyledObject,
  TStyledSetComponent,
  TStyledSetConfig
} from './typings';

export function styledSet(config: TStyledSetConfig) {
  const { element, styles, attrs, compose, system, variants } = config.base;

  const StyledBase = !!element
    ? styledObject(element || 'div', styles || {}, {
        attrs,
        compose,
        system,
        variants
      })
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
    } = props as TStyledSetComponent;

    const BaseElement = !!as
      ? as
      : isStyledComponent(StyledBase)
      ? StyledBase
      : 'div';

    return {
      ...components,
      [name]: styledObject(
        BaseElement,
        { ...styles },
        {
          compose,
          variants,
          system,
          attrs
        }
      )
    };
  }, {} as Record<string, TStyledObject>);
}
