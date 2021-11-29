import { format } from './formatter';
import { IUserExpenses } from './types';
import { readUserExpenses } from './data/db-expense';
import { to } from '@nc/utils/async';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';

export async function getUserExpenses(userId): Promise<IUserExpenses> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  const [dbError, rawExpense] = await to(readUserExpenses(userId));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawExpense) {
    throw NotFound(`Could not find expenses for user with id ${userId}`);
  }

  const expenses = rawExpense.map((item) => format(item));

  return { expenses };
}
