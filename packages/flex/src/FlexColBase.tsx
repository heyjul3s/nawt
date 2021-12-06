import styled from 'styled-components';
import { flexbox } from 'styled-system';

export const FlexColBase = styled.div(
  {
    boxSizing: 'border-box',
    position: 'relative'
  },
  flexbox
);
