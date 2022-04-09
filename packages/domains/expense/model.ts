import { BadRequest, InternalError } from '@nc/utils/errors';
import { getUserDetails } from '@nc/domain-user/model';
import { to } from '@nc/utils/async';
import { format } from './formatter';
import { findExpenses } from './data/db-expense';
import { transformAndValidate } from 'class-transformer-validator';
import { Expense, SearchExpensesRequest } from './types';

export async function getUserExpenses(req): Promise<Array<Expense>> {

  const [validationError] = await to(transformAndValidate<SearchExpensesRequest>(SearchExpensesRequest, req));

  if (validationError) {
    throw BadRequest(validationError);
  }

  const [userError] = await to(getUserDetails(req.userId));

  if (userError) {
    throw userError;
  }

  const [dbError, expenses] = await to(findExpenses(req.userId, req.pageToken, req.pageSize, req.statuses, req.expenseIds, req.merchants, req.minAmount, req.maxAmount, req.currencies, req.sortBy));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  expenses.forEach(expense => format(expense));

  return expenses;
}
