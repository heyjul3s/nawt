import { styledObject } from '../../styled/src';

import {
  alignSelf,
  gridArea,
  gridColumn,
  gridRow,
  justifySelf,
  alignItems,
  alignContent,
  flex,
  justifyItems,
  justifyContent
} from 'styled-system';

export const GridItem = styledObject(
  'div',
  {},
  {
    compose: [
      alignSelf,
      gridArea,
      gridColumn,
      gridRow,
      justifySelf,
      alignItems,
      alignContent,
      flex,
      justifyItems,
      justifyContent
    ]
  }
);
