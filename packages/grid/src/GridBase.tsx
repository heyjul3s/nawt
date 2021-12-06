import styled from 'styled-components';

import {
  alignItems,
  alignContent,
  background,
  border,
  color,
  compose,
  display,
  justifyItems,
  justifyContent,
  grid,
  layout,
  position,
  shadow,
  space,
  typography
} from 'styled-system';

export const GridBase = styled.div(
  compose(
    alignItems,
    alignContent,
    background,
    border,
    color,
    display,
    grid,
    justifyItems,
    justifyContent,
    layout,
    position,
    shadow,
    space,
    typography
  )
);
