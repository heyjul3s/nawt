import styled from 'styled-components';

import {
  alignSelf,
  compose,
  gridArea,
  gridColumn,
  gridRow,
  justifySelf,
  alignItems,
  alignContent,
  background,
  border,
  color,
  display,
  flex,
  justifyItems,
  justifyContent,
  layout,
  position,
  shadow,
  space,
  typography
} from 'styled-system';

export const GridItem = styled.div(
  compose(
    alignSelf,
    gridArea,
    gridColumn,
    gridRow,
    justifySelf,
    alignItems,
    alignContent,
    background,
    border,
    color,
    display,
    flex,
    justifyItems,
    justifyContent,
    layout,
    position,
    shadow,
    space,
    typography
  )
);
