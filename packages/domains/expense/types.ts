export interface IExpense {
    id: string
    merchant_name: string
    amount_in_cents: string
    currency: string
    user_id: string
    date_created: string
    status: string
}

export interface IUserExpenses {
    expenses: IExpense[]
}

export interface Ipagination {
    pageInfo: {
        total: number
        currentPage: number
        totalPages: number
    }
    queryName: IExpense[]
}

export interface IQuery {
    userId?: string
    limit?: number
    page?: number
}
