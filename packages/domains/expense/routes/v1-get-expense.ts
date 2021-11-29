import { ApiError } from '@nc/utils/errors';
import { getUserExpenses } from '../model';
import { Router } from 'express';
import { secureTrim } from '../formatter';
import { to } from '@nc/utils/async';

export const router = Router();

router.get('/get-user-expenses', async (req, res, next) => {
  const [errorResponse, userExpenses] = await to(getUserExpenses(req.query?.userId));

  if (errorResponse) {
    return next(new ApiError(errorResponse, errorResponse.status, `Could not get user details: ${errorResponse}`, errorResponse.title, req));
  }

  if (!userExpenses) {
    return res.json({});
  }

  const responseJson = JSON.parse(secureTrim(userExpenses.expenses));

  return res.json(responseJson);
});
