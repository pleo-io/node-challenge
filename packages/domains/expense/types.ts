export interface IExpense {
    id: string
    merchant_name: string
    amount_in_cents: string
    currency: string
    user_id: string
    date_created: string
}

export interface IUserExpenses {
    expenses: IExpense[]
}
