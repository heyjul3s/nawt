import { FlexboxProps } from 'styled-system';

export type TFlexRowBaseProps = TFlexRowCompProps | FlexboxProps;

export type TFlexRowCompProps = {
  reverse?: boolean;
};

export type TFlexColBaseProps = TFlexColCompProps | FlexboxProps;

export type TFlexColCompProps = {
  totalColumns: number;
  offset: number | number[];
  columnSize: number | number[];
  gutterWidth: number;
  reverse: boolean;
};
