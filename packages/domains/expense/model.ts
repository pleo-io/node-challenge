import { ApiError, ApiErrorType, InternalError, NotFound } from '@nc/utils/errors';
import { getUserDetails } from '@nc/domain-user/model';
import { to } from '@nc/utils/async';
import { format, secureTrim } from './formatter';
import { findExpenses } from './data/db-expense';
import { Expense, SearchExpensesRequest } from './types';

export async function getUserExpenses(req: SearchExpensesRequest): Promise<[null, Array<Expense>] | [ApiErrorType, null?]> {

  const [userError] = await to(getUserDetails(req.userId));

  if (userError) {
    throw userError;
  }

  const [dbError, expenses] = await to(findExpenses(req.userId, req.pageToken, req.pageSize, req.orderBy, req.orderDir, req.statuses, req.expenseIds, req.merchants, req.minAmount, req.maxAmount, req.currencies));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  expenses.forEach(expense => {
    secureTrim(expense);
    format(expense);
  });

  return expenses;
}
