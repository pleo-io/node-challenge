import { ApiError } from '@nc/utils/errors';
import { Router } from 'express';
import { getUserExpenses } from '../model';
import { to } from '@nc/utils/async';

export const router = Router();

router.post('/get-expenses', async (req, res, next) => {

  const [expensesError, expenses] = await to(getUserExpenses(req.body));

  if (expensesError) {
    return next(new ApiError(expensesError, expensesError.status, `Could not get expenses: ${expensesError.message}`, expensesError.title, req));
  }

  return res.json(expenses);
});


