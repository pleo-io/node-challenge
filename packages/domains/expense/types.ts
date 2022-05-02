import { Request, Response, NextFunction } from "express";

type PROCESSED = string;
type PENDING = string;
type STATUS = PROCESSED | PENDING;

export type FilterDirection = {
  asc: string;
  desc: string;
};

export interface Expense {
  id: string;
  merchant_name: string;
  amount_in_cents: number;
  currency: string; 
  user_id: string;
  date_created: string;
  status: STATUS;
}

export interface QueryData {
  query: string;
  params: Array<number | string>;
}

export type Middleware = (
  req: Request,
  res: Response,
  Next: NextFunction
) => any;
