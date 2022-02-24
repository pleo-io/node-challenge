import { query } from '@nc/utils/db';
import { randomUUID } from 'crypto';
import { Expenses, Status } from '../../src/expenses.models';

export function fakeExpense(partialExpenses: Partial<Expenses> = {}): Expenses {
  return {
    id: randomUUID(),
    amount_in_cents: 10,
    currency: 'KKK',
    merchant_name: 'Cafe',
    status: Status.Pending,
    date_created: new Date(),
    user_id: randomUUID(),
    ...partialExpenses,
  };
}

export function fakeManyExpenses(user_id: string, amount: number): Expenses[] {
  return Array(amount).fill(null).map(() => fakeExpense({
    user_id,
  }));
}

export async function seedDatabase(expenses: Expenses[]): Promise<void> {
  const sql = 'Insert Into expenses (id, merchant_name, amount_in_cents, currency, user_id, date_created, status)';
  const values = expenses.map((expense) => `(${[`'${expense.id}'`, `'${expense.merchant_name}'`, expense.amount_in_cents, `'${expense.currency}'`, `'${expense.user_id}'`, `'${expense.date_created.toISOString()}'`, `'${expense.status}'`].join(' , ')})`).join(' , ');
  await query(sql.concat(`values ${values}`));
}

export async function removeExpenses(user_ids: string[]): Promise<void> {
  const sql = `Delete from expenses where user_id  in (${user_ids.map((id) => `'${id}'`).join(',')})`;
  await query(sql);
}
