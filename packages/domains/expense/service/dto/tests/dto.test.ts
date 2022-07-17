import { GetUserExpensesRequestDTO } from '../index';

describe('[Packages | Expense-Domain | service | dto ] GetUserExpensesRequestDTO', () => {
  it('should return a validation error object if any of the fields are invalid', async () => {
    const testCase = {
      userId: 'abc123456',
      limit: 10,
      offset: 'abc',
    };
    const SUT = new GetUserExpensesRequestDTO(testCase.userId, testCase.limit, parseInt(testCase.offset));
    const validationResult = await SUT.validate();
    expect(validationResult)
      .not
      .toBeNull();
    expect(validationResult)
      .toEqual( // 1
        expect.arrayContaining([ // 2
          expect.objectContaining({ // 3
            property: 'userId',
            constraints: ['userId must be a UUID'], // 4
          }),
        ])
      );
    expect(validationResult)
      .toEqual( // 1
        expect.arrayContaining([
          expect.objectContaining({
            property: 'offset',
            constraints: ['offset must be an integer number'],
          }),
        ])
      );
  });
  it('Should return a null validation object if the validation passes', async () => {
    const testCase = {
      userId: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474', // valid uuid
      limit: 10,
      offset: 11,
    };
    const SUT = new GetUserExpensesRequestDTO(testCase.userId, testCase.limit, testCase.offset);
    const validationResult = await SUT.validate();
    expect(validationResult)
      .toBeNull();
  });
});
