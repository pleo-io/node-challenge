import { Api } from '../utils/api';

describe('Testing GET /expense/v1/get-expenses endpoint', function () {

  it('respond with 400 HTTP status code and Bad Request if userId is missing from request body', async () => {

    const response = await Api.post('/expense/v1/get-expenses').send({});

    expect(response.status).toBe(400);
    expect(response.body.status).toBe(400);
    expect(response.body.title).toBe("Bad Request");
    expect(response.body.message).toContain("property userId has failed the following constraints: isString")
  });

  it('respond with 400 HTTP status code and Bad Request if pageToken is missing from the request body', async () => {

    const response = await Api.post('/expense/v1/get-expenses').send({
      userId: "da140a29-ae80-4f0e-a62d-6c2d2bc8a474"
    });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe(400);
    expect(response.body.title).toBe("Bad Request");
    expect(response.body.message).toContain("property pageToken has failed the following constraints: isDateString")
  });

  it('respond with 404 HTTP status code and Not Found if requested user does not exist', async () => {

    const response = await Api.post('/expense/v1/get-expenses').send({
      userId: "da140a29-ae80-4f0e-a62d-6c2d2bc8a475",
      pageToken: "2000-09-18T20:57:40"
    });

    expect(response.status).toBe(404);
    expect(response.body.status).toBe(404);
    expect(response.body.title).toBe("Not Found");
    expect(response.body.message).toBe("Could not get expenses: Could not find user with id da140a29-ae80-4f0e-a62d-6c2d2bc8a475")
  });


  it('respond with 200 HTTP status code and correct user expenses', async () => {

    const response = await Api.post('/expense/v1/get-expenses').send({
      userId: "da140a29-ae80-4f0e-a62d-6c2d2bc8a474",
      pageToken: "2000-09-18T20:57:40"
    });

    expect(response.status).toBe(200);
    const expenses = response.body;
    expenses.forEach(expense => {
      expect(expense.user_id).toBe("da140a29-ae80-4f0e-a62d-6c2d2bc8a474");
    });
  });

});
