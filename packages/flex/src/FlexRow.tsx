import styled from 'styled-components';
import { FlexRowBase } from './FlexRowBase';
import { Property } from 'csstype';

type TFlexRowProps = {
  reverse?: boolean;
};

export const FlexRow = styled(FlexRowBase)<TFlexRowProps>(props => ({
  flexDirection: setFlexDirection(props.reverse)
}));

export function setFlexDirection(
  isReverse: boolean | undefined
): Property.FlexDirection {
  return !isReverse ? 'row' : 'row-reverse';
}
