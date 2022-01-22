import { flexbox, grid } from 'styled-system';
import { styledObject } from '../../styled/src';

import type { Config } from 'styled-system';
import type { TStyledObject } from '../../styled/src';

export const typographyStyleProps: Config = {
  textDecoration: true,
  textIndent: true,
  textTransform: true,
  textOverflow: true,
  whiteSpace: true,
  wordBreak: true,
  wordSpacing: true
};

export const Block: TStyledObject = styledObject( 'div', {}, { compose: [flexbox, grid], system: typographyStyleProps });
