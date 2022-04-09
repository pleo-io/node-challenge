import { Api } from '../utils/api';

describe('Testing GET /user/v1/get-user-details endpoint', function () {

  it('respond with 400 HTTP status code and Bad Request if userId param is missing', async () => {

    const response = await Api.get('/user/v1/get-user-details');

    expect(response.status).toBe(400);
    expect(response.body.status).toBe(400);
    expect(response.body.title).toBe("Bad Request");
    expect(response.body.message).toBe("Could not get user details: userId property is missing.")
  });

  it('respond with 404 HTTP status code and Not Found if requested user does not exist', async () => {

    const response = await Api.get('/user/v1/get-user-details?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a475');

    expect(response.status).toBe(404);
    expect(response.body.status).toBe(404);
    expect(response.body.title).toBe("Not Found");
    expect(response.body.message).toBe("Could not get user details: Could not find user with id da140a29-ae80-4f0e-a62d-6c2d2bc8a475")
  });

  it('respond with 200 HTTP status code and correct details of requested user', async () => {

    const response = await Api.get('/user/v1/get-user-details?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474');

    expect(response.status).toBe(200);
    expect(response.body).toBe('{\"first_name\":\"Jeppe\",\"last_name\":\"Rindom\",\"company_name\":\"pleo\"}');
  });

});
