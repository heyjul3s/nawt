import type { TRangedQueryToken } from '../typings'

export function isMinMaxTokenValue(token: TRangedQueryToken) {
  return token?.value === 'min' || token?.value === 'max';
}

export function isMinMaxQuery(tokens: TRangedQueryToken[]) {
  return !!tokens?.filter(token => token.token === '>=' || token.token === '<=')
    ?.length;
}
