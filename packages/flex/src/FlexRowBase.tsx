import { styledObject } from '@nawt/styled';
import type { TStyledObject } from '@nawt/styled';

export const FlexRowBase: TStyledObject = styledObject('div', {
  display: 'flex',
  flex: '0 1 auto',
  flexWrap: 'wrap'
});
