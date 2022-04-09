import { randomUUID } from 'crypto';
import { Expense, ExpenseStatus } from '../../domains/expense/types';
import { destroyUserExpenses, insert } from '../../domains/expense/data/db-expense';

export function generateExpense(partialExpenses: Partial<Expense> = {}): Expense {
  return {
    id: randomUUID(),
    user_id: randomUUID(),
    merchant_name: 'Cafe',
    amount_in_cents: 10,
    currency: 'DKK',
    status: ExpenseStatus.PENDING,
    date_created: new Date(),
    ...partialExpenses,
  };
}

export function generateExpenses(user_id: string, amount: number, status?: string,): Array<Expense> {
  return Array(amount).fill(null).map(() => generateExpense({
    user_id, status,
  }));
}

export function seedDatabase(expenses: Array<Expense>): Promise<void> {
  return insert(expenses);
}

export function removeExpenses(userIds: Array<String>): Promise<void> {
  return destroyUserExpenses(userIds);
}

export async function runScenario<T>(config: {
  seed: () => Promise<void>
  scenario: () => Promise<T>
  teardown: () => Promise<void>
}): Promise<T> {
  try {
    await config?.seed();
    return await config?.scenario();
  } finally {
    await config?.teardown();
  }
}
