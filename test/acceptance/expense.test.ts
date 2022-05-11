import { Api } from './utils/api';

const user_id = 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474';
const url = '/expense-managements/v1/expenses';

describe('Expenses routes (Given all tests were running on initial seeding data)', () => {
  describe('List expenses', () => {
    test('Should fail request if user_id query was not provided', () => {
      return Api.get(url)
        .expect(400)
        .then((response) => {
          expect(response.body.message).toEqual('user_id query is required and must be a valid uuid-v4!');
        });
    });

    test('Should fail for negative limit query values', () => {
      return Api.get(url)
        .query({ user_id, limit: -1 })
        .expect(400)
        .then((response) => {
          expect(response.body.message).toEqual('limit query must be between 1 and 50!');
        });
    });

    test('Should fail request with invalid sort query structure', () => {
      return Api.get(url)
        .query({ user_id, sort: ['id'] })
        .expect(400)
        .then((response) => {
          expect(response.body.message).toEqual('sort query must be one of merchant_name, amount_in_cents, currency, id, date_created, status, optionally followed by type ex: (id:asc, id:desc)');
        });
    });

    test('Should fail request with invalid sort query column', () => {
      return Api.get(url)
        .query({ user_id, sort: ['manager'] })
        .expect(400)
        .then((response) => {
          expect(response.body.message).toEqual('sort query must be one of merchant_name, amount_in_cents, currency, id, date_created, status, optionally followed by type ex: (id:asc, id:desc)');
        });
    });

    test('Should fail request with invalid sort query column', () => {
      return Api.get(url)
        .query({ user_id, sort: ['manager'] })
        .expect(400)
        .then((response) => {
          expect(response.body.message).toEqual('sort query must be one of merchant_name, amount_in_cents, currency, id, date_created, status, optionally followed by type ex: (id:asc, id:desc)');
        });
    });

    test('Should fail request if merchant_name_like include special character', () => {
      return Api.get(url)
        .query({ user_id, merchant_name_like: '$test' })
        .expect(400)
        .then((response) => {
          expect(response.body.message).toEqual('merchant_name_like query must have at least 2 chars and contain "alphanumeric" characters only!');
        });
    });

    test('Should successfully apply sorting with paging', () => {
      return Api.get(url)
        .query({ user_id, sort: ['merchant_name:asc'], limit: 1, offset: 1 })
        .expect(200)
        .then((response) => {
          expect(response.body.data).toHaveLength(1);
          expect(response.body.data).toEqual([{
            id: 'f20866f9-7d46-45f2-822c-4b568e216a13',
            merchant_name: 'Donkey Republic',
            amount_in_cents: 6000,
            currency: 'DKK',
            status: 'processed',
            date_created: '2021-09-19T18:57:40.021Z',
          }]);
          expect(response.body.paging).toEqual({ total: 3 });
        });
    });

    test('Should successfully apply all filters', () => {
      return Api.get(url)
        .query({ user_id, merchant_name_like: 'Slid', status: 'processed' })
        .expect(200)
        .then((response) => {
          expect(response.body.data).toHaveLength(1);
          expect(response.body.data).toEqual([{
            id: '314d54f4-8a5f-4c1d-b735-426b54794a44',
            merchant_name: 'Sliders',
            amount_in_cents: 12000,
            currency: 'DKK',
            status: 'processed',
            date_created: '2021-09-20T18:57:40.021Z',
          }]);
          expect(response.body.paging).toEqual({ total: 1 });
        });
    });
  });
});
