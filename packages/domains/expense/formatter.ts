import { Expense } from "./types";
import { capitalize } from "@nc/utils/capitalize";

const publicFields = [
  "merchant_name",
  "amount_in_cents",
  "currency",
  "date_created",
  "status",
];

export function secureTrim(expense: Expense) {
  return JSON.stringify(expense, publicFields);
}


export function format(rawExpense: Expense): Expense {
  return {
    merchant_name: capitalize(rawExpense.merchant_name),
    currency: rawExpense.currency.toUpperCase(),
    ...rawExpense,
  };
}
