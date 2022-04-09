import { capitalize, format } from '../formatter';

describe('[Packages | User-domain | Formatter] format', () => {
  test('format should return an instance of users that fits the API model, based on the db raw value', () => {
    return expect(format({
      id: '1234',
      user_id: 'abcd',
      merchant_name: 'pleo pleo',
      amount_in_cents: 10000,
      currency: 'DKK',
      status: 'pending',
      date_created: '2022-01-01T01:01:01'
    })).toEqual({
      id: '1234',
      user_id: 'abcd',
      merchant_name: 'Pleo pleo',
      amount_in_cents: 10000,
      currency: 'DKK',
      status: 'pending',
      date_created: '2022-01-01T01:01:01'
    });
  });
});
