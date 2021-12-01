import { getUserExpenses } from '../model';

// TODO POSITIVE TESTS
describe('[Packages | Expense-domain] getUserExpenses', () => {
  test('should return a users expenses', async () => {
    const result = await getUserExpenses({
      userId: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474',
      limit: 2,
    });
    expect(result?.pageInfo).toHaveProperty('total');
    expect(result?.pageInfo).toHaveProperty('currentPage');
    expect(result?.pageInfo).toHaveProperty('totalPages');
    expect(result).toHaveProperty('User Expenses');
    expect(Array.isArray(result['User Expenses'])).toBe(true);
    expect(result['User Expenses'][0]?.merchant_name).toBe('Cafe 22');
  });

  test('should return a second page of users expenses', async () => {
    const result = await getUserExpenses({
      userId: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474',
      limit: 2,
      page: 2,
    });
    expect(result?.pageInfo).toHaveProperty('total');
    expect(result?.pageInfo).toHaveProperty('currentPage');
    expect(result?.pageInfo).toHaveProperty('totalPages');
    expect(result).toHaveProperty('User Expenses');
    expect(Array.isArray(result['User Expenses'])).toBe(true);
    expect(result['User Expenses'][0]?.merchant_name).toBe('Donkey Republic');
  });
});

// TODO NEGATIVE TESTS
describe('[Packages | Expense-domain] getUserExpenses', () => {
  test('should return a users expenses', async () => {
    try {
      await getUserExpenses({
        userId: 'wrong-user-id',
        limit: 2,
      });
    } catch (error) {
      expect(error.message).toMatch(
        /Error fetching data from the DB: invalid input syntax for type uuid/
      );
      expect(error.title).toBe('Internal Server Error');
    }
  });
});
