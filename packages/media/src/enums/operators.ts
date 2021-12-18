export enum OperatorKeys {
  '&&' = '&&',
  '||' = '||',
  '!' = '!',
  ':=' = ':=',
  '>=' = '>=',
  '<=' = '<=',
  '==' = '=='
}

export type TLogicalOperators = typeof logicalOperators;

export const logicalOperators = {
  [OperatorKeys['&&']]: 'and',
  [OperatorKeys['||']]: ',',
  [OperatorKeys['!']]: 'not',
  [OperatorKeys[':=']]: 'only'
};

export type TRelationalOperators = typeof relationalOperators;

export const relationalOperators = {
  [OperatorKeys['>=']]: 'min',
  [OperatorKeys['<=']]: 'max',
  [OperatorKeys['==']]: ':'
};
