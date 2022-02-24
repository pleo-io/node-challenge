import { Expenses } from '../../src/expenses.models';
import { getExpenses } from '../../src/expenses.repository';
import { randomUUID } from 'crypto';
import { runWithSeeding } from '../../../../../test/utils/helpers/async';
import { SortingEnum } from '@nc/utils/types';
import { close, connect } from '@nc/utils/db';
import { fakeExpense, fakeManyExpenses, removeExpenses, seedDatabase } from '../helpers/helpers';

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
          field: 'amount_in_cents',
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
          field: 'amount_in_cents',
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
          field: 'amount_in_cents',
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
