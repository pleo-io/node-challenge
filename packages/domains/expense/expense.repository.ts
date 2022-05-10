import { FindExpenseOptions } from './types';

import { query } from '@nc/utils/db';

export const expenseRepository = {
  findAll: async ({ filter, selection, sort, paging }: FindExpenseOptions) => {
    const columns = selection?.length ? Array.from(new Set(selection)) : ['*'];

    const queryParts = [`SELECT ${columns.join(',')} FROM expense`];
    const parameters = [];

    if (filter) {
      // apply filters
    }

    if (sort) {
      // apply sort
    }

    queryParts.push('LIMIT ?, OFFSET ?');
    parameters.push(paging?.limit ?? 25, paging?.offset ?? 0);

    const [rows] = await query(queryParts.join(' '), parameters);

    return rows;
  },
};
