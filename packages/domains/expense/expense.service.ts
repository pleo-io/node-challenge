import { expenseRepository } from './expense.repository';
import { FindExpenseOptions } from './types';

const publicFields: FindExpenseOptions['selection'] = [
  'id', 'merchant_name', 'amount_in_cents', 'currency', 'status', 'date_created',
];

export const expenseService = {
  listAll: async ({ filter, paging, sort }: Omit<FindExpenseOptions, 'selection'>) => {
    const expenses = await expenseRepository.findAll({ filter, paging, sort, selection: publicFields });
    const count = await expenseRepository.count({ filter });

    return {
      data: expenses,
      paging: {
        total: count,
      },
    };
  },
};
