import { format, secureTrim } from "../formatter";
import { capitalize } from "@nc/utils/capitalize";

describe("[Packages | Expense-domain | Formatter] secureTrim", () => {
  test("capitalize should make the first character as a capital letter", () => {
    return expect(capitalize("cafe 22")).toEqual("Cafe 22");
  });
});

describe("[Packages | Expense-domain | Formatter] secureTrim", () => {
  test("secureTrim should remove fields that are not defined in the List of public fields", () => {
    return expect(
      secureTrim({
        id: "3e920f54-49df-4d0b-b11b-e6f08e3a2dca",
        merchant_name: "Cafe 22",
        amount_in_cents: 12000,
        currency: "DKK",
        user_id: "da140a29-ae80-4f0e-a62d-6c2d2bc8a474",
        date_created: "2021-09-21 20:57:40.021428",
        status: "pending",
      })
    ).toEqual(
      JSON.stringify({
        merchant_name: "Cafe 22",
        amount_in_cents: 12000,
        currency: "DKK",
        date_created: "2021-09-21 20:57:40.021428",
        status: "pending",
      })
    );
  });
});

describe("[Packages | Expense-domain | Formatter] Format", () => {
  test("format should return an instance of users that fits the API model, based on the db raw value", () => {
    return expect(
      format({
        id: "3e920f54-49df-4d0b-b11b-e6f08e3a2dca",
        merchant_name: "cafe 22",
        amount_in_cents: 12000,
        currency: "dkk",
        user_id: "da140a29-ae80-4f0e-a62d-6c2d2bc8a474",
        date_created: "2021-09-21 20:57:40.021428",
        status: "pending",
      })
    ).toEqual({
      id: "3e920f54-49df-4d0b-b11b-e6f08e3a2dca",
      merchant_name: "Cafe 22",
      amount_in_cents: 12000,
      currency: "DKK",
      user_id: "da140a29-ae80-4f0e-a62d-6c2d2bc8a474",
      date_created: "2021-09-21 20:57:40.021428",
      status: "pending",
    });
  });
});
