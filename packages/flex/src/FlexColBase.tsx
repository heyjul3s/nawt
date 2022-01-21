import { styledObject } from '../../styled/src';
import { flexbox } from 'styled-system';

import type { TStyledObject } from '../../styled/src';
import type { FlexboxProps } from 'styled-system'

export const FlexColBase: TStyledObject<FlexboxProps> = styledObject(
  'div',
  {
    boxSizing: 'border-box',
    position: 'relative'
  },
  {
    compose: [flexbox]
  }
);
