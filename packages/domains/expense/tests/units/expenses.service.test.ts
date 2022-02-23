import { Expenses } from '../../src/expenses.models';
import { ExpensesRepository } from '../../src/expenses.repository';
import { QueryPage } from '@nc/utils/types';
import { createExpensesService, ExpensesService } from '../../src/expenses.services';

describe('Expenses Services', () => {
  const repositoryMock: ExpensesRepository = {
    getExpenses: () => Promise.resolve({
      data: [],
      page: 1,
      pageSize: 10,
      total: 10,
    }),
  };
  let services: ExpensesService = null;

  beforeAll(() => {
    services = createExpensesService(repositoryMock);
  });

  afterEach(() => jest.clearAllMocks());

  describe('getExpenses', () => {
    it('should call the repository.getExpenses', async () => {
      const mockRepository = jest.spyOn(repositoryMock, 'getExpenses');

      const query: QueryPage<Expenses> = {
        page: 10,
        pageSize: 100,
        merchant_name: 'Coffee',
      };
      await services.getExpenses(query);

      expect(mockRepository).toBeCalledWith(query);
    });
  });
});
