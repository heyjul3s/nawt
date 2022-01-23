import { styledObject } from '../../styled/src';

import type { Config } from 'styled-system';
import type { TStyledObject } from '../../styled/src';
import type { TTypographyProps } from './typings';

export const typographyStyleProps: Config = {
  textDecoration: true,
  textIndent: true,
  textTransform: true,
  textOverflow: true,
  whiteSpace: true,
  wordBreak: true,
  wordSpacing: true
};

export const Block: TStyledObject<TTypographyProps> = styledObject(
  'div',
  {},
  { system: typographyStyleProps }
);
