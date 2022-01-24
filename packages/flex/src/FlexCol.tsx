import styled from 'styled-components';
import css from '@styled-system/css';
import { FlexColBase } from './FlexColBase';
import type { TFlexColProps } from './typings';

export const FlexCol = styled(FlexColBase)<TFlexColProps>((props) => {
  const baseColumnWidth = getColumnWidth(props.totalColumns);
  const columnSizing = setColumnSizing(baseColumnWidth, props.columnSize);
  const columnOffset = setColumnOffset(baseColumnWidth, props.offset);
  const gutterWidth = setGutterWidth(props.gutterWidth);
  const gap = !gutterWidth && !props?.gap ? '1em' : props?.gap;

  return css({
    boxSizing: 'border-box',
    flexBasis: columnSizing,
    maxWidth: columnSizing,
    ...(!!columnOffset && { marginLeft: columnOffset }),
    ...(!!gutterWidth && { paddingLeft: gutterWidth }),
    ...(!!gutterWidth && { paddingRight: gutterWidth }),
    gap
  });
});

export function getColumnWidth(totalColumns = 12): number {
  return isNumber(totalColumns) && totalColumns > 2
    ? Number(parseFloat((100 / totalColumns).toString()).toFixed(2))
    : 100;
}

export function setColumnSizing(
  baseColumnWidth: number,
  columnSize: number | number[]
): any {
  return Array.isArray(columnSize) && columnSize.length > 1
    ? columnSize.map(
        (size) => `${parseNumberToTwoDecimals(size * baseColumnWidth)}%`
      )
    : `${parseNumberToTwoDecimals((columnSize as number) * baseColumnWidth)}%`;
}

export function setColumnOffset(
  baseColumnWidth: number,
  offset: number | number[]
): any {
  if (Array.isArray(offset) && offset.length > 1) {
    return offset.map((size) => `${size * baseColumnWidth}%`);
  }

  if (!Array.isArray(offset) && !!offset) {
    return `${(offset as number) * baseColumnWidth}%`;
  }

  return void 0;
}

export function setGutterWidth(gutterWidth: number | number[] = 1): any {
  return Array.isArray(gutterWidth) && gutterWidth.length > 1
    ? gutterWidth.map((width) => `${width / 2}em`)
    : `${(gutterWidth as number) / 2}em`;
}

export function parseNumberToTwoDecimals(value: number): string {
  return `${parseFloat(String(value)).toFixed(2)}`;
}

export function isNumber(val: number): boolean {
  return !isNaN(val) && isFinite(val);
}
