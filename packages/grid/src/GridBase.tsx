import { styledObject } from '@artefakt/styled';

import {
  alignItems,
  alignContent,
  justifyItems,
  justifyContent,
  grid
} from 'styled-system';

export const GridBase = styledObject(
  'div',
  {},
  {
    compose: [alignItems, alignContent, grid, justifyItems, justifyContent]
  }
);
