export type TTokenType =
  | 'ranged'
  | 'statement'
  | 'logical'
  | 'relational'
  | 'unit';

export type TToken = {
  index: number;
  type: TTokenType;
  token: string;
  value?: string;
};
