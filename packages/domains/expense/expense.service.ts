import { expenseRepository } from './expense.repository';
import { FindExpenseOptions } from './types';
import { InternalError } from '@nc/utils/errors';
import { to } from '@nc/utils/async';

const publicFields: FindExpenseOptions['selection'] = [
  'id', 'merchant_name', 'amount_in_cents', 'currency', 'status', 'date_created',
];

const defaultPaging = { limit: 10, offset: 0 };

export const expenseService = {
  listAll: async ({ filter, paging, sort }: Omit<FindExpenseOptions, 'selection'>) => {
    const [error, expenses] = await to(expenseRepository.findAll({ filter, paging, sort, selection: publicFields }));
    const [countError, count] = await to(expenseRepository.count({ filter }));

    if (error || countError) throw InternalError(error.message);

    return {
      data: expenses,
      paging: {
        ...(paging ?? defaultPaging),
        total: count,
      },
    };
  },
};
