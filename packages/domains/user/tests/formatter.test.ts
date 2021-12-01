import { format, secureTrim } from '../formatter';

describe('[Packages | User-domain | Formatter] secureTrim', () => {
  test('secureTrim should remove fields that are not defined in the list of public fields', () => {
    return expect(secureTrim({
      first_name: 'John',
      last_name: 'Smith',
      company_name: 'Pleo',
      ssn: 1,
    })).toEqual(JSON.stringify({
      first_name: 'John',
      last_name: 'Smith',
      company_name: 'Pleo',
    }));
  });
});

describe('[Packages | User-domain | Formatter] format', () => {
  test('format should return an instance of users that fits the API model, based on the db raw value', () => {
    return expect(format({
      first_name: 'john',
      last_name: 'smith',
      company_name: 'Pleo',
      ssn: 1,
    })).toEqual({
      first_name: 'John',
      last_name: 'Smith',
      company_name: 'Pleo',
      ssn: 1,
    });
  });
});
