import { Expense, sequelize } from '../db-expense.ts';

describe('[Packages | Expense-domain | DB] authenticate', () => {
  test('sequelize should be able to connect to db', () => {
  });

  test('defined type and sequelize type for expense should be equal', () => {
    assert(Expense === sequelize.models.Expense);
  });

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
