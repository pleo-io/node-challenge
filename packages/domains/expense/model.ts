import { format } from './formatter';
import pagination from '@nc/utils/pagination';
import { to } from '@nc/utils/async';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';
import { countUserExpenses, readUserExpenses } from './data/db-expense';
import { Ipagination, IQuery } from './types';

export async function getUserExpenses({ userId, limit, page }: IQuery): Promise<Ipagination> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  const [[dbError, rawExpense], [error, count]] =
  await Promise.all([
    await to(readUserExpenses({ userId, limit, page })),
    await to(countUserExpenses(userId)),
  ]);

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (error) {
    throw InternalError(`Error fetching data from the DB: ${error.message}`);
  }

  if (!rawExpense) {
    throw NotFound(`Could not find expenses for user with id ${userId}`);
  }

  const expenses = rawExpense.map((item) => format(item));
  const total = count?.count * 1 || 0;

  const data = pagination(expenses, 'User Expenses', total, limit, page);

  return data;
}
