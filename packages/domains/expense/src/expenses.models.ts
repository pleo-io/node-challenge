export enum Status {
  Pending = 'pending',
  Processed = 'Processed'
}

export interface Expenses {
  id?: string
  merchant_name: string
  amount_in_cents: number
  currency: string
  user_id: string
  date_created: Date
  status: Status
}
