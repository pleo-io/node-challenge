
import { randomUUID } from 'crypto';
import { SortingEnum } from '@nc/utils/types';
import { Expense, ExpenseStatus } from '@nc/domain-expense/types';
import { generateExpense, generateExpenses, runScenario, } from './expense-data-helper';
import { destroyUserExpenses, findExpenses, insert } from '@nc/domain-expense/data/db-expense';
import sequelize from '@nc/utils/db';

describe('db-expense test', () => {

  beforeAll(async () => {
    await sequelize.sync();
    await sequelize.authenticate();
  });

  afterAll(async () => {
    await sequelize.close();
  })

  it('should retrieve first page of expenses with user_id', async () => {
    const user_id_1 = randomUUID();
    const user_id_2 = randomUUID();

    const generated_expenses: Array<Expense> = [
      ...await generateExpenses(user_id_1, 20),
      ...await generateExpenses(user_id_2, 10),
    ];

    const expenses = await runScenario({
      seed: () => insert(generated_expenses),
      scenario: () => findExpenses(user_id_1, new Date("1970-01-01T01:01:01")),
      teardown: () => destroyUserExpenses([user_id_1, user_id_2]),
    });

    expect(expenses).toHaveLength(10);
  });

  it('should filter on status and merchant_name', async () => {
    const user_id = randomUUID();
    const generated_expenses: Array<Expense> = [
      generateExpense({
        user_id,
        amount_in_cents: 10,
        merchant_name: 'A',
        status: ExpenseStatus.PENDING,
      }),
      generateExpense({
        user_id,
        amount_in_cents: 100,
        merchant_name: 'B',
        status: ExpenseStatus.PROCESSED,
      }),
      generateExpense({
        user_id,
        amount_in_cents: 1,
        merchant_name: 'C',
        status: ExpenseStatus.PENDING,
      })];

    const expenses = await runScenario({
      seed: () => insert(generated_expenses),
      scenario: () => findExpenses(
        user_id, new Date("1970-01-01T01:01:01"), null, [ExpenseStatus.PENDING], null, ['A', 'B'], null, null, null, [{
          field: 'amount_in_cents',
          order: SortingEnum.ASC,
        }],
      ),
      teardown: () => destroyUserExpenses([user_id]),
    });

    expect(expenses).toHaveLength(1);
    expect(expenses[0].status).toBe(ExpenseStatus.PENDING);
    expect(expenses[0].merchant_name).toBe('A');
  });

  it('should sort ascendent the expenses by amount_in_cents', async () => {
    const user_id = randomUUID();
    const generated_expenses: Array<Expense> = [
      generateExpense({
        user_id,
        amount_in_cents: 10,
        merchant_name: 'A',
      }),
      generateExpense({
        user_id,
        amount_in_cents: 100,
        merchant_name: 'B',
      }),
      generateExpense({
        user_id,
        amount_in_cents: 1,
        merchant_name: 'C',
      })];

    const expenses = await runScenario({
      seed: () => insert(generated_expenses),
      scenario: () => findExpenses(
        user_id, new Date("1970-01-01T01:01:01"), null, null, null, null, null, null, null, [{
          field: 'amount_in_cents',
          order: SortingEnum.ASC,
        }],
      ),
      teardown: () => destroyUserExpenses([user_id]),
    });

    expect(expenses).toHaveLength(3);
    expect(expenses[1].amount_in_cents).toBeGreaterThanOrEqual(expenses[0].amount_in_cents);
    expect(expenses[2].amount_in_cents).toBeGreaterThanOrEqual(expenses[1].amount_in_cents);
  });

  it('should filter on minAmount and maxAmount', async () => {
    const user_id = randomUUID();
    const generated_expenses: Array<Expense> = [
      generateExpense({
        user_id,
        amount_in_cents: 99,
        merchant_name: 'A',
      }),
      generateExpense({
        user_id,
        amount_in_cents: 100,
        merchant_name: 'B',
      }),
      generateExpense({
        user_id,
        amount_in_cents: 999,
        merchant_name: 'B',
      }),
      generateExpense({
        user_id,
        amount_in_cents: 1000,
        merchant_name: 'B',
      }),
      generateExpense({
        user_id,
        amount_in_cents: 1001,
        merchant_name: 'C',
      })];

    const expenses = await runScenario({
      seed: () => insert(generated_expenses),
      scenario: () => findExpenses(
        user_id, new Date("1970-01-01T01:01:01"), null, null, null, null, 100, 1000, null, [{
          field: 'amount_in_cents',
          order: SortingEnum.ASC,
        }],
      ),
      teardown: () => destroyUserExpenses([user_id]),
    });

    expect(expenses).toHaveLength(2);
    expect(expenses[0].amount_in_cents).toBe(100);
    expect(expenses[1].amount_in_cents).toBe(999);
  });

});
