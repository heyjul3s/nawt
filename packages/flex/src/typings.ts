export type TFlexColProps = Partial<{
  totalColumns: number;
  columnSize: number | number[];
  offset: number | number[];
  gutterWidth: number | number[];
  gap: number;
}>;

export type TFlexRowProps = {
  reverse?: boolean;
};
