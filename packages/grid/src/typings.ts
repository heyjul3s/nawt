import {
  AlignItemsProps,
  AlignContentProps,
  AlignSelfProps,
  JustifyItemsProps,
  JustifyContentProps,
  GridProps,
  GridAreaProps,
  GridColumnProps,
  GridRowProps,
  JustifySelfProps
} from 'styled-system';

export type TGridBaseProps =
  | AlignItemsProps
  | AlignContentProps
  | JustifyItemsProps
  | JustifyContentProps
  | GridProps;

export type TGridItemBaseProps =
  | AlignSelfProps
  | GridAreaProps
  | GridColumnProps
  | GridRowProps
  | JustifySelfProps;
