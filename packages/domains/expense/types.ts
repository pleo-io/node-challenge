export interface IExpense {
    id: string
    merchant_name: string
    amount_in_cents: number
    currency: string
    user_id: string
    date_created: string
    status: string
}

export interface IUserExpenses {
    expenses: IExpense[]
}

export interface IObject {
    [propname: string]: string | number
}

export interface Ipagination {
    pageInfo: {
        total: number
        currentPage: number
        totalPages: number
    }
    [propname: string]: IExpense[]
}

export interface IQuery {
    userId?: string
    limit?: number
    page?: number
}
