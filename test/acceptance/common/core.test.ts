import { Api, ApiGateway } from '../utils/api';

describe('Given that we have a healthy service', () => {
  describe('Healtcheck', () => {
    test('Healthcheck route should return positively', (done) => {
      ApiGateway.get('/healthcheck')
        .expect(200, done);
    });

    test('Readiness route should return positively', (done) => {
      ApiGateway.get('/readycheck')
        .expect(200, done);
    });
  });

  describe('Security', () => {
    test.skip('Should intercept reflected xss attacks', (done) => {
      // Add a get route with a path parameter that may be vulnerable
      Api.get('/some-path?query=5f71591cbfd15b0007481261n8lsr%3cscript%3ealert(1)%3c%2fscript%3emvfsn')
        .expect(406, done);
    });

    test.skip('Should intercept reflected xss attacks', (done) => {
      // Add a get route with a path parameter that may be vulnerable
      ApiGateway.get('/some-path?query=5f71591cbfd15b0007481261n8lsr%3cscript%3ealert(1)%3c%2fscript%3emvfsn')
        .expect(406, done);
    });
  });

  describe('Context', () => {
    test('Should return a unique request id in the headers', () => {
      return ApiGateway.get('/jsonapi/')
        .expect(404)
        .then((res) => {
          return expect(res.headers['x-request-id']).not.toBeNull();
        });
    });

    test('Should forward inbound request ids in the headers', () => {
      return ApiGateway.get('/jsonapi/')
        .set('x-request-id', 'abc')
        .expect(404)
        .then((res) => {
          return expect(res.headers['x-request-id']).toEqual('abc');
        });
    });
  });
});
