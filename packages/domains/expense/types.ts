export type Expense = {
  id: string
  merchant_name: string
  amount_in_cents: number
  currency: string
  user_id: string
  date_created: string
  status: string
}

type ExpenseKey = keyof Omit<Expense, 'id'>

export type FindExpenseOptions = {
  filter?: Pick<Expense, 'status' | 'merchant_name' | 'user_id'>
  selection?: ExpenseKey[]
   sort?: { [p in keyof Omit<Expense, 'id'>]: 1 | -1 }
  paging?: { limit: number, offset: number }
}
