import { Expense } from './types';

export function capitalize(word) {
  const str = `${word}`;
  return str[0].toUpperCase() + str.slice(1);
}

export function upperCase(word) {
  return word.toUpperCase();
}

export function format(rawExpense: Expense): Expense {
  return {
    id: rawExpense.id,
    user_id: rawExpense.user_id,
    merchant_name: capitalize(rawExpense.merchant_name),
    amount_in_cents: rawExpense.amount_in_cents,
    currency: rawExpense.currency,
    date_created: rawExpense.date_created,
    status: rawExpense.status,
  };
}
