import { ApiError } from '@nc/utils/errors';
import { getUserExpenses } from '../model';
import { IQuery } from '../types';
import { secureTrim } from '../formatter';
import { to } from '@nc/utils/async';
import { NextFunction, Request, Response, Router } from 'express';

export const router = Router();

router.get('/get-user-expenses', async (req: Request<{}, {}, {}, IQuery>, res: Response, next: NextFunction) => {
  const { userId, limit, page } = req.query;
  const [errorResponse, userExpenses] = await to(getUserExpenses({ userId, limit: limit || 10, page }));

  if (errorResponse) {
    return next(new ApiError(errorResponse, errorResponse.status, `Could not get user expenses: ${errorResponse}`, errorResponse.title, req));
  }

  if (!userExpenses) {
    return res.json({});
  }

  // TODO validate response objects fields
  userExpenses.UserExpenses = JSON.parse(secureTrim(userExpenses.UserExpenses));

  return res.json(userExpenses);
});
