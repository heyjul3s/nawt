import { styledObject } from '../../styled/src';
import type { TStyledObject } from '../../styled/src';

export const FlexRowBase: TStyledObject = styledObject('div', {
  display: 'flex',
  flex: '0 1 auto',
  flexWrap: 'wrap'
});
