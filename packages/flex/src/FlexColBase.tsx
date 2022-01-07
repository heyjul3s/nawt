import { styledObject } from '@artefakt/styled';
import { flexbox } from 'styled-system';

import type { TStyledObject } from '@artefakt/styled';
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
