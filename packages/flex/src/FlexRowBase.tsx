import styled from 'styled-components';
import { flexbox } from 'styled-system';

export const FlexRowBase = styled.div(
  {
    display: 'flex',
    flex: '0 1 auto',
    flexWrap: 'wrap'
  },
  flexbox
);
