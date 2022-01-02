import { styledObject } from '@artefakt/styled';
import { system } from 'styled-system';

import type { StyledComponent } from 'styled-components';

export const typographyStyleProps = system({
  textDecoration: true,
  textIndent: true,
  textTransform: true,
  textOverflow: true,
  whiteSpace: true,
  wordBreak: true,
  wordSpacing: true
});

export const Text = styledObject(
  { system: typographyStyleProps },
  'p'
);
