import partition from 'lodash.partition';
import { isMinMaxQuery } from './utils';
import type { TRangedQueryToken } from '../typings';

export function sortRangedQueryTokens(
  tokens
): TRangedQueryToken[][] | TRangedQueryToken[] {
  if (tokens?.length === 5) {
    return sortMinMaxRangedQuery(tokens);
  }

  if (tokens?.length === 3) {
    return sortRangedQueryStatement(tokens);
  }

  return [];
}

export function sortRangedQueryStatement(tokens: TRangedQueryToken[]) {
  const typeSequence = isMinMaxQuery(tokens)
    ? ['relational', 'ranged', 'unit']
    : ['ranged', 'relational', 'unit'];

  return sortBy(tokens, typeSequence, 'type');
}

export function sortMinMaxRangedQuery(tokens: TRangedQueryToken[]) {
  const typeSequence = ['relational', 'ranged', 'unit'];
  const partitionedTokens = partition(tokens, ['type', 'ranged']);
  const queryType = partitionedTokens?.[0]?.[0];
  const queries = partitionedTokens[1];

  const chunked = queries.reduce((all, one, i) => {
    const chunk = Math.floor(i / 2);

    all[chunk] = sortBy(
      [].concat(all[chunk] || [queryType], one),
      typeSequence,
      'type'
    );

    return all;
  }, []);

  return chunked;
}

export function sortBy(array, order, key) {
  return order?.length >= 1
    ? array?.sort((a, b) => {
        const A = a[key];
        const B = b[key];

        return order?.indexOf(A) > order?.indexOf(B) ? 1 : -1;
      })
    : array;
}
