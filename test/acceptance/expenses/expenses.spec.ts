import { Api } from '../utils/api';
import { Expenses } from '../../../packages/domains/expense/src/expenses.models';
import { randomUUID } from 'crypto';
import { runWithSeeding } from '../../utils/helpers/async';
import { fakeExpense, fakeManyExpenses, removeExpenses, seedDatabase } from '../../../packages/domains/expense/tests/helpers/helpers';

describe('Expenses', () => {
  describe('GET /get-expenses', () => {
    const endpointPath = '/expenses/get-expenses';
    it('get the first page of expenses with 10 expenses by default', () => {
      return Api.get(endpointPath)
        .expect(200);
    });

    it('get the first page of expenses with 10 expenses by default', () => {
      const user_id = randomUUID();
      return runWithSeeding({
        seed: () => seedDatabase(fakeManyExpenses(user_id, 100)),
        act: async () => {
          const { body } = await Api.get(endpointPath).query({
            user_id,
          }).expect(200);

          expect(body).toMatchObject({
            page: 1,
            pageSize: 10,
            total: 100,
            data: expect.arrayContaining([
              expect.objectContaining({
                amount_in_cents: expect.any(Number),
                currency: expect.any(String),
                date_created: expect.any(String),
                id: expect.any(String),
                merchant_name: expect.any(String),
                status: expect.any(String),
                user_id: expect.any(String),
              })]),
          });
        },
        teardown: () => removeExpenses([user_id]),
      });
    });

    it('should sort the expenses ascendent by amount_in_cents ', () => {
      const user_id = randomUUID();
      const fixtures: Expenses[] = [
        fakeExpense({
          user_id,
          amount_in_cents: 100,
        }),
        fakeExpense({
          user_id,
          amount_in_cents: 10,
        }),
        fakeExpense({
          user_id,
          amount_in_cents: 1,
        })];

      return runWithSeeding({
        seed: () => seedDatabase(fixtures),
        act: async () => {
          const { body: { data } } = await Api.get(endpointPath).query({
            user_id,
            sorting: {
              field: 'amount_in_cents',
              sort: 'asc',
            },
          }).expect(200);

          expect(data[0].amount_in_cents).toBeLessThanOrEqual(data[1].amount_in_cents);
          expect(data[1].amount_in_cents).toBeLessThanOrEqual(data[2].amount_in_cents);
        },
        teardown: () => removeExpenses([user_id]),
      });
    });

    it('should sort the expenses ascendent by amount_in_cents ', () => {
      const user_id = randomUUID();
      const fixtures: Expenses[] = [
        fakeExpense({
          user_id,
          amount_in_cents: 1,
        }),
        fakeExpense({
          user_id,
          amount_in_cents: 100,
        }),
        fakeExpense({
          user_id,
          amount_in_cents: 10,
        })];

      return runWithSeeding({
        seed: () => seedDatabase(fixtures),
        act: async () => {
          const { body: { data } } = await Api.get(endpointPath).query({
            user_id,
            sorting: {
              field: 'amount_in_cents',
              sort: 'desc',
            },
          }).expect(200);

          expect(data[0].amount_in_cents).toBeGreaterThanOrEqual(data[1].amount_in_cents);
          expect(data[1].amount_in_cents).toBeGreaterThanOrEqual(data[2].amount_in_cents);
        },
        teardown: () => removeExpenses([user_id]),
      });
    });

    it.each(
      [
        ['user_id', 'is not uuid', 'a string'],
        ['user_id', 'is not uuid', 'a string'],
        ['amount_in_cents', 'is not positive', -2],
        ['amount_in_cents', 'is not a number', 'a string'],
        ['date_created', 'is not a date', 'a string'],
        ['page', 'is not positive', -2],
        ['page', 'is not a number', 'a string'],
        ['pageSize', 'is not positive', -2],
        ['pageSize', 'is not a number', 'a string'],
        ['sorting', 'is not a object', 'a string'],
        ['sorting', 'has not valid value on field', {
          field: 'random_column',
        }],

      ]
    )('should return bad request if %p %p', (field: string, _, value: any) => {
      return Api.get(endpointPath)
        .query({
          [`${field}`]: value,
          user_id: 1,
        })
        .expect(400);
    });
  });
});
