import { ApiError } from '@nc/utils/errors';

interface ExpectedApiError {
  message: string
  status: number
  title: string
}

const executeTriggeringFunction = (triggeringFunction) => {
  try {
    triggeringFunction();
    return null;
  } catch (e) {
    return e;
  }
};

const assertApiError = (error: ApiError, expected: ExpectedApiError): jest.CustomMatcherResult => {
  if (typeof error === 'function') {
    error = executeTriggeringFunction(error);
  }

  const isExpectedErrorType: boolean = (error instanceof ApiError)
  && error.status === expected.status
  && error.title === expected.title;

  if (!isExpectedErrorType) {
    return {
      pass: false,
      message: () => `expected ApiError<${expected.title}> with message "${expected.message}", received ${JSON.stringify(error)}.`,
    };
  }

  if (error.message !== expected.message) {
    return {
      pass: false,
      message: () => `expected ApiError<${expected.title}> with message "${expected.message}", received unexpected error message: \`${error.message}\`.`,
    };
  }

  return {
    pass: true,
    message: () => '',
  };
};

expect.extend({
  toThrowUnauthorized<T extends ApiError>(receivedError: T, expectedMessage: string) {
    return assertApiError(
      receivedError,
      { message: expectedMessage, status: 401, title: 'Unauthorized' }
    );
  },
  toThrowBadRequest<T extends ApiError>(receivedError: T, expectedMessage: string) {
    return assertApiError(
      receivedError,
      { message: expectedMessage, status: 400, title: 'Bad Request' }
    );
  },
  toThrowNotFound<T extends ApiError>(receivedError: T, expectedMessage: string) {
    return assertApiError(
      receivedError,
      { message: expectedMessage, status: 404, title: 'Not Found' }
    );
  },
  toThrowConflict<T extends ApiError>(receivedError: T, expectedMessage: string) {
    return assertApiError(
      receivedError,
      { message: expectedMessage, status: 409, title: 'Conflict' }
    );
  },
  toThrowInternalError<T extends ApiError>(receivedError: T, expectedMessage: string) {
    return assertApiError(
      receivedError,
      { message: expectedMessage, status: 500, title: 'Internal Server Error' }
    );
  },
});
