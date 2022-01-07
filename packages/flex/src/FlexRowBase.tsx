import { styledObject } from '@artefakt/styled';
import { flexbox } from 'styled-system';

import type { TStyledObject } from '@artefakt/styled';
import type { FlexboxProps } from 'styled-system'

export const FlexRowBase: TStyledObject<FlexboxProps> = styledObject(
  'div',
  {
    display: 'flex',
    flex: '0 1 auto',
    flexWrap: 'wrap'
  },
  {
    compose: [flexbox]
  }
);
