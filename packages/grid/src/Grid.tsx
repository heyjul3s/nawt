import styled from 'styled-components';
import { GridBase } from './GridBase';
import css from '@styled-system/css';

type TGridProps = Partial<{
  columnWidth: string | string[];
  columnLength: number | number[];
  gap: string | string;
}>;

export const Grid = styled(GridBase)<TGridProps>(props => {
  const gridTemplateColumns = setGridTemplateColumns(
    props.columnWidth,
    props.columnLength
  );

  return css({
    display: 'grid',
    gridGap: props.gap || '1.5em',
    gridTemplateColumns
  });
});

export const setGridTemplateColumns = (
  columnWidth?: string | string[],
  columnLength?: number | number[]
): any => {
  if (columnWidth) {
    return setRepeatableColumnWidths(columnWidth);
  }

  if (columnLength) {
    return setRepeatableColumnLengths(columnLength);
  }

  return '';
};

export function setRepeatableColumnWidths(
  columnWidth: string | string[]
): string | string[] {
  return Array.isArray(columnWidth) && columnWidth.length
    ? columnWidth.map(width => repeatableColumnWidth(width))
    : repeatableColumnWidth(columnWidth as string);
}

export function repeatableColumnWidth(columnWidth: string): string {
  return `repeat(auto-fit, minmax(${columnWidth}, 1fr))`;
}

export function setRepeatableColumnLengths(
  columnLength: number | number[]
): string | string[] {
  return Array.isArray(columnLength) && columnLength.length
    ? columnLength.map(length => repeatableColumnLength(length))
    : repeatableColumnLength(columnLength as number);
}

export function repeatableColumnLength(columnLength: number): string {
  return `repeat(${columnLength}, 1fr)`;
}
