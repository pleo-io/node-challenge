import { format, secureTrim } from '../formatter';

describe('[Packages | Expense-domain | Formatter] secureTrim', () => {
  test('secureTrim should remove fields that are not defined in the list of public fields', () => {
    return expect(
      secureTrim({
        merchant_name: 'Cafe 22',
        amount_in_cents: 8000,
        currency: 'DKK',
        id: '3e920f54-49df-4d0b-b11b-e6f08e3a2dca',
        user_id: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474',
        date_created: '2021-09-21 20:57:40.021428',
        status: 'pending',
      })
    ).toEqual(
      JSON.stringify({
        merchant_name: 'Cafe 22',
        amount_in_cents: 8000,
        currency: 'DKK',
        date_created: '2021-09-21 20:57:40.021428',
        status: 'pending',
      })
    );
  });

  test('secureTrim should remove fields that are not defined in the list of public fields for array input', () => {
    return expect(
      secureTrim([{
        merchant_name: 'Cafe 22',
        amount_in_cents: 8000,
        currency: 'DKK',
        id: '3e920f54-49df-4d0b-b11b-e6f08e3a2dca',
        user_id: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474',
        date_created: '2021-09-21 20:57:40.021428',
        status: 'pending',
      }])
    ).toEqual(
      JSON.stringify([{
        merchant_name: 'Cafe 22',
        amount_in_cents: 8000,
        currency: 'DKK',
        date_created: '2021-09-21 20:57:40.021428',
        status: 'pending',
      }])
    );
  });
});

describe('[Packages | Expense-domain | Formatter] format', () => {
  test('format should return an instance of users that fits the API model, based on the db raw value', () => {
    return expect(
      format({
        merchant_name: 'Cafe 22',
        amount_in_cents: 8000,
        currency: 'DKK',
        id: '3e920f54-49df-4d0b-b11b-e6f08e3a2dca',
        user_id: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474',
        date_created: '2021-09-21 20:57:40.021428',
        status: 'pending',
      })
    ).toEqual({
      merchant_name: 'Cafe 22',
      amount_in_cents: 8000,
      currency: 'DKK',
      id: '3e920f54-49df-4d0b-b11b-e6f08e3a2dca',
      user_id: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474',
      date_created: '2021-09-21 20:57:40.021428',
      status: 'pending',
    });
  });
});
