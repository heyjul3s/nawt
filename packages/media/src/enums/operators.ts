export enum OperatorKeys {
  'and' = '&&',
  'or' = '||',
  'not' = '!',
  'only' = ':=',
  'min' = '>=',
  'max' = '<=',
  'equals' = '=='
}

export type Operators = typeof operators;

export const operators = {
  [OperatorKeys.and]: 'and',
  [OperatorKeys.or]: ',',
  [OperatorKeys.not]: 'not',
  [OperatorKeys.only]: 'only',
  [OperatorKeys.min]: 'min',
  [OperatorKeys.max]: 'max',
  [OperatorKeys.equals]: ':'
};
