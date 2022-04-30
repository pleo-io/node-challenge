import { Request, Response, NextFunction } from "express";

type PROCESSED = string;
type PENDING = string;
type STATUS = PROCESSED | PENDING;

export interface Expense {
  id: string;
  merchant_name: string;
  amount_in_cents: number;
  currency: string;
  user_id: string;
  date_created: string;
  status: STATUS;
}

export interface ExpenseQuery {
  userId?: string;
  limit?: number;
  page?: number;
  orderBy?: string;
}

export type Middleware = (
  req: Request,
  res: Response,
  Next: NextFunction
) => any;
