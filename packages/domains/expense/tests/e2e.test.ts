import { Api } from "../../../../test/acceptance/utils/api";

describe("[Packages | Expose-domain | E2E]", () => {
  it("Should test that the request to get expenses by userId works", async () => {
    const response = await Api.get(
      "/expense/v1/get-expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474"
    ).expect(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("Should SORT the Expenses of a User by amount_in_cents in descending order", async () => {
    const response = await Api.get(
      "/expense/v1/get-expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&sorBy[desc]=amount_in_cents"
    ).expect(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("Should FILTER the result of the Expenses of a User by merchant_name", async () => {
    const response = await Api.get(
      "/expense/v1/get-expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&merchant_name=Donkey Republic"
    ).expect(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("Should PAGINATE the result of querying the Expenses of a User", async () => {
    const response = await Api.get(
      "/expense/v1/get-expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&limit=2&offset=1&pageNumber=1"
    ).expect(200);
    expect(response.body).toBeDefined();
  });

  it("Should apply all possible QUERY CONSTRAINTS on querying the Expenses of a User", async () => {
    await Api.get(
      "/expense/v1/get-expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&amount_in_cents[gt]=3000&limit=2&offset=0&pageNumber=1&merchant_name=Sliders&sorBy[desc]=amount_in_cents"
    ).expect(200);
  });
});
