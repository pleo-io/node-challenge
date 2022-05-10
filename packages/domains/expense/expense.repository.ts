import { FindExpenseOptions } from './types';

import { query } from '@nc/utils/db';

const tableName = 'expenses';

const getFilterQuery = (filter: FindExpenseOptions['filter']): [string, any[]] => {
  const filterAttributes = [];
  const parameters = [];

  Object.entries(filter).forEach(([key, value], index) => {
    if (key === 'merchant_name_like') {
      filterAttributes.push(`merchant_name like $${index + 1}`);
      parameters.push(`%${value}%`);
    } else {
      filterAttributes.push(`${key} = $${index + 1}`);
      parameters.push(value);
    }
  });

  return [`WHERE ${filterAttributes.join(' AND ')}`, parameters];
};

export const expenseRepository = {
  findAll: async ({ filter, selection, sort, paging }: FindExpenseOptions) => {
    const columns = selection?.length ? Array.from(new Set(selection)) : ['*'];

    const queryParts = [`SELECT ${columns.join(',')} FROM ${tableName}`];
    const parameters = [];

    if (filter) {
      const [filterQuery, filterParams] = getFilterQuery(filter);
      queryParts.push(filterQuery);
      parameters.push(...filterParams);
    }

    if (sort) {
      // apply sort
    }

    queryParts.push(`LIMIT ${paging?.limit ?? 25} OFFSET ${paging?.offset ?? 0}`);

    const { rows } = await query(queryParts.join(' '), parameters);

    return rows;
  },

  count: async ({ filter }: Pick<FindExpenseOptions, 'filter'>) => {
    const queryParts = [`SELECT COUNT(id) FROM ${tableName}`];
    const parameters = [];

    if (filter) {
      const [filterQuery, filterParams] = getFilterQuery(filter);
      queryParts.push(filterQuery);
      parameters.push(...filterParams);
    }

    const { rows } = await query(queryParts.join(' '), parameters);

    return parseInt(rows?.[0]?.count);
  },
};
