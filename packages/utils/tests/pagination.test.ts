import pagination from '../pagination';
import { paginationResponse, userExpenses } from '../mocks';

describe('[Packages | utils | Pagination] pagination', () => {
  test('should return an object with page info and an array of data', () => {
    return expect(pagination(userExpenses, 'Table Name', userExpenses.length, 2, 1)).toEqual(paginationResponse);
  });
});
