import { Api } from '../utils/api';

describe('[Packages | Expense-domain] [GET]/expense/v1/get-user-expenses', () => {
  describe('should get a users expenses', () => {
    test('/expense/v1/get-user-expenses should return 3 user expenses on first page', async () => {
      const response = await Api.get(
        '/expense/v1/get-user-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474'
      );
      const { UserExpenses, pageInfo } = response.body;

      expect(response.status).toBe(200);
      expect(UserExpenses.length).toBe(3);
      expect(pageInfo.total).toBe(3);
      expect(pageInfo.currentPage).toBe(1);
      expect(pageInfo.totalPages).toBe(1);
      expect(UserExpenses[0].merchant_name).toBe('Cafe 22');
      expect(UserExpenses[0].amount_in_cents).toBe(8000);
      expect(UserExpenses[0].status).toBe('pending');
    });

    test('/expense/v1/get-user-expenses should return 1 user expense', async () => {
      const response = await Api.get(
        '/expense/v1/get-user-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&limit=1'
      );
      const { UserExpenses } = response.body;

      expect(response.status).toBe(200);
      expect(UserExpenses.length).toBe(1);
    });

    test('/expense/v1/get-user-expenses should return sorted result', async () => {
      const response = await Api.get(
        '/expense/v1/get-user-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&orderBy=merchant_name'
      );
      const { UserExpenses } = response.body;

      expect(response.status).toBe(200);
      expect(UserExpenses[0].merchant_name).toBe('Cafe 22');
      expect(UserExpenses[0].amount_in_cents).toBe(8000);
      expect(UserExpenses[0].status).toBe('pending');
    });

    test('/expense/v1/get-user-expenses should return zero results and total pages of zero', async () => {
      const response = await Api.get(
        '/expense/v1/get-user-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&page=2'
      );
      const { UserExpenses, pageInfo } = response.body;

      expect(response.status).toBe(200);
      expect(pageInfo.total).toBe(0);
      expect(pageInfo.currentPage).toBe(0);
      expect(pageInfo.totalPages).toBe(0);
      expect(UserExpenses.length).toBe(0);
    });

    test('/expense/v1/get-user-expenses should return error', async () => {
      const response = await Api.get(
        '/expense/v1/get-user-expenses?userId=12345'
      );
      expect(response.status).toBe(500);
      expect(response.body.title).toBe('Internal Server Error');
      expect(response.body.message).toMatch(
        /Error fetching data from the DB: invalid input syntax for type uuid/
      );
    });

    test('/expense/v1/get-user-expenses should return 400 error', async () => {
      const response = await Api.get('/expense/v1/get-user-expenses');
      expect(response.status).toBe(400);
      expect(response.body.title).toBe('Bad Request');
      expect(response.body.message).toBe(
        'Could not get user expenses: Error: userId property is missing.'
      );
    });
  });
});
