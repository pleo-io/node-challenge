export type Expense = {
  id: string
  merchant_name: string
  amount_in_cents: number
  currency: string
  user_id: string
  date_created: string
  status: string
}

type ExpenseKey = keyof Expense

export type FindExpenseOptions = {
  filter?: Partial<Pick<Expense, 'status' | 'user_id'> & { merchant_name_like: string }>
  selection?: ExpenseKey[]
  sort?: { [p in keyof Omit<Expense, 'id'>]: 1 | -1 }
  paging?: { limit: number, offset: number }
}
