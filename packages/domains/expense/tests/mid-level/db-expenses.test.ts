import { Expenses } from '../../expenses';
import { getExpenses } from '../../data/db-expenses';
import { randomUUID } from 'crypto';
import { SortingEnum } from '@nc/utils/types';
import { Status } from '../../status';
import { close, connect, query } from '@nc/utils/db';

describe('Expenses Db', () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await close();
  });

  it('should retrieve first page expenses with user_id', async () => {
    // Arrange
    const user_id = randomUUID();
    const another_user_id = randomUUID();

    const fixtures: Expenses[] = [
      ...await fakeManyExpenses(user_id, 100),
      ...await fakeManyExpenses(another_user_id, 10),
    ];

    // Act
    const expenses = await runWithSeeding({
      seed: () => seedDatabase(fixtures),

      act: () => getExpenses({
        user_id,
      }),

      teardown: () => removeExpenses([user_id]),
    });

    // Assert
    expect(expenses.total).toBe(100);
    expect(expenses.data).toHaveLength(10);
  });

  it('should sort ascendent the expenses expenses by amount_in_cents', async () => {
    // Arrange
    const user_id = randomUUID();
    const fixtures: Expenses[] = [
      fakeExpense({
        user_id,
        amount_in_cents: 100,
        merchant_name: 'coffee',
      }),
      fakeExpense({
        user_id,
        amount_in_cents: 10,
        merchant_name: 'Coca Cola',
      }),
      fakeExpense({
        user_id,
        amount_in_cents: 1,
        merchant_name: 'sweets',
      })];

    // Act
    const { data: expenses } = await runWithSeeding({
      seed: () => seedDatabase(fixtures),

      act: () => getExpenses({
        user_id,
        sorting: {
          fields: 'amount_in_cents',
          sort: SortingEnum.ASCENDENT,
        },
      }),

      teardown: () => removeExpenses([user_id]),
    });

    // Assert
    expect(expenses).toHaveLength(3);
    expect(expenses[1].amount_in_cents).toBeGreaterThanOrEqual(expenses[0].amount_in_cents);
    expect(expenses[2].amount_in_cents).toBeGreaterThanOrEqual(expenses[1].amount_in_cents);
  });

  it('should sort ascendent by default', async () => {
    // Arrange
    const user_id = randomUUID();
    const fixtures: Expenses[] = [
      fakeExpense({
        user_id,
        amount_in_cents: 100,
        merchant_name: 'coffee',
      }),
      fakeExpense({
        user_id,
        amount_in_cents: 10,
        merchant_name: 'Coca Cola',
      }),
      fakeExpense({
        user_id,
        amount_in_cents: 1,
        merchant_name: 'sweets',
      })];

    // Act
    const { data: expenses } = await runWithSeeding({
      seed: () => seedDatabase(fixtures),

      act: () => getExpenses({
        user_id,
        sorting: {
          fields: 'amount_in_cents',
        },
      }),

      teardown: () => removeExpenses([user_id]),
    });

    // Assert
    expect(expenses).toHaveLength(3);
    expect(expenses[1].amount_in_cents).toBeGreaterThanOrEqual(expenses[0].amount_in_cents);
    expect(expenses[2].amount_in_cents).toBeGreaterThanOrEqual(expenses[1].amount_in_cents);
  });

  it('should sort descendent the expenses expenses by amount_in_cents', async () => {
    // Arrange
    const user_id = randomUUID();

    const fixtures: Expenses[] = [
      fakeExpense({
        user_id,
        amount_in_cents: 1,
      }),
      fakeExpense({
        user_id,
        amount_in_cents: 10,
      }),
      fakeExpense({
        user_id,
        amount_in_cents: 100,

      })];

    // Act
    const { data: expenses } = await runWithSeeding({
      seed: () => seedDatabase(fixtures),

      act: () => getExpenses({
        user_id,
        sorting: {
          fields: 'amount_in_cents',
          sort: SortingEnum.DESCENDENT,
        },
      }),

      teardown: () => removeExpenses([user_id]),
    });

    // Assert
    expect(expenses).toHaveLength(3);
    expect(expenses[1].amount_in_cents).toBeLessThanOrEqual(expenses[0].amount_in_cents);
    expect(expenses[2].amount_in_cents).toBeLessThanOrEqual(expenses[1].amount_in_cents);
  });
});

// Helper Functions

function fakeExpense(partialExpenses: Partial<Expenses> = {}): Expenses {
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

function fakeManyExpenses(user_id: string, amount: number): Expenses[] {
  return Array(amount).fill(null).map(() => fakeExpense({
    user_id,
  }));
}

async function seedDatabase(expenses: Expenses[]): Promise<void> {
  const sql = 'Insert Into expenses (id, merchant_name, amount_in_cents, currency, user_id, date_created, status)';
  const values = expenses.map((expense) => `(${[`'${expense.id}'`, `'${expense.merchant_name}'`, expense.amount_in_cents, `'${expense.currency}'`, `'${expense.user_id}'`, `'${expense.date_created.toISOString()}'`, `'${expense.status}'`].join(' , ')})`).join(' , ');
  await query(sql.concat(`values ${values}`));
}

async function removeExpenses(user_ids: string[]): Promise<void> {
  const sql = `Delete from expenses where user_id  in (${user_ids.map((id) => `'${id}'`).join(',')})`;
  await query(sql);
}

async function runWithSeeding<T>(config: {
  seed: () => Promise<void>
  teardown: () => Promise<void>
  act: () => Promise<T>

}): Promise<T> {
  try {
    await config?.seed();
    return await config?.act();
  } finally {
    await config?.teardown();
  }
}
