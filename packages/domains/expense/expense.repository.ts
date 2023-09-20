import { InternalError } from '@nc/utils/errors';
import { Knex } from 'knex';
import { knexClient } from '@nc/utils/knex';
import { to } from '@nc/utils/async';
import { Expense, FindExpenseOptions } from './types';

const applyExpensesFilter = (query: Knex.QueryBuilder, filter: FindExpenseOptions['filter']) => {
  Object.entries(filter).forEach(([key, value]) => {
    if (key === 'merchant_name_like') query.andWhereLike('merchant_name', `%${value}%`);

    else query.andWhere({ [key]: value });
  });
};

const applyExpensesSort = (query: Knex.QueryBuilder, sort: FindExpenseOptions['sort']) => {
  const sortingCols = Object.entries(sort)
    .map(([key, value]) => ({ column: key, order: value === 1 ? 'asc' : 'desc' }));

  query.orderBy(sortingCols);
};

const queryBuilder = () => knexClient<Expense>('expenses', { only: true });

export const expenseRepository = {
  findAll: async ({ filter, selection, sort, paging }: FindExpenseOptions) => {
    const columns = selection?.length ? Array.from(new Set(selection)) : [];

    const query = queryBuilder().select(...columns);

    if (filter) applyExpensesFilter(query, filter);
    if (sort) applyExpensesSort(query, sort);

    const [error, expenses] = await to(query.limit(paging?.limit ?? 25).offset(paging?.offset ?? 0));

    if (error) throw InternalError(error.message, error);

    return expenses;
  },

  count: async ({ filter }: Pick<FindExpenseOptions, 'filter'>) => {
    const query = queryBuilder().count('id');
    if (filter) applyExpensesFilter(query, filter);

    const [error, { count }] = await to(query.first());

    if (error) throw InternalError(error.message, error);

    return typeof count === 'string' ? parseInt(count) : count;
  },
};
