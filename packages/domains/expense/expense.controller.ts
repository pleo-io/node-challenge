import { ApiError } from '@nc/utils/errors';
import { expenseService } from './expense.service';
import express from 'express';
import { FindExpenseOptions } from './types';
import { to } from '@nc/utils/async';

export const expenseController = {
  listExpenses: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { limit, offset, user_id, status, merchant_name_like } = req.query as any;

    const listOptions: FindExpenseOptions = {};

    if (limit || offset) {
      listOptions.paging = { limit, offset };
    }

    listOptions.filter = {
      ...(user_id ? { user_id } : {}),
      ...(status ? { status } : {}),
      ...(merchant_name_like ? { merchant_name_like } : {}),
    };

    const [error, result] = await to(expenseService.listAll(listOptions));

    if (error) {
      return next(new ApiError(error, error.status, `Could not list expenses: ${error}`, error.title, req));
    }

    return res.json(result);
  },
};
