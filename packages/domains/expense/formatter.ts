import capitalize from '@nc/utils/capitalize';
import { IExpense, IObject } from './types';

const publicFields = ['merchant_name', 'amount_in_cents', 'currency', 'date_created', 'status'];

export function secureTrim(expense: IExpense[] | IObject): string {
  return JSON.stringify(expense, publicFields);
}

export function format(rawExpense: any): IExpense {
  return {
    id: rawExpense.id,
    merchant_name: capitalize(rawExpense.merchant_name),
    amount_in_cents: rawExpense.amount_in_cents,
    currency: rawExpense.currency,
    user_id: rawExpense.user_id,
    date_created: rawExpense.date_created,
    status: rawExpense.status,
  };
}
