import { styledObject } from '../../styled/src';
import { flexbox } from 'styled-system';

import type { TStyledObject } from '../../styled/src';
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
