import { Expenses } from './expenses.models';
import { ExpensesRepository, getExpenses } from './expenses.repository';
import { Page, QueryPage } from '@nc/utils/types';

export interface ExpensesService {
  getExpenses(query: QueryPage<Expenses>): Promise<Page<Expenses>>
}

export function createExpensesService(repository: ExpensesRepository): ExpensesService {
  return {
    getExpenses(query: QueryPage<Expenses>): Promise<Page<Expenses>> {
      return repository.getExpenses(query);
    },
  };
}

export default createExpensesService({ getExpenses });
