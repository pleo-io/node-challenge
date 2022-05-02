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
    id: rawExpense.id,
    merchant_name: capitalize(rawExpense.merchant_name),
    amount_in_cents: rawExpense.amount_in_cents,
    currency: rawExpense.currency.toUpperCase(),
    user_id: rawExpense.user_id,
    date_created: rawExpense.date_created,
    status: rawExpense.status,
  };
}
