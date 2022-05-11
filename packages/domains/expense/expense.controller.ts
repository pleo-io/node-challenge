import { expenseService } from './expense.service';
import express from 'express';
import { FindExpenseOptions } from './types';

export const expenseController = {
  listExpenses: async (req: express.Request, res: express.Response) => {
    const { limit, offset, user_id, status, merchant_name_like, sort } = req.query as any;

    const listOptions: FindExpenseOptions = {};

    if (limit || offset) {
      listOptions.paging = { limit, offset };
    }

    listOptions.filter = {
      ...(user_id ? { user_id } : {}),
      ...(status ? { status } : {}),
      ...(merchant_name_like ? { merchant_name_like } : {}),
    };

    if (sort) {
      listOptions.sort = sort?.reduce((agg, sortObj) => ({ ...agg, [sortObj.column]: sortObj.type }), {});
    }

    const result = await expenseService.listAll(listOptions);

    return res.json(result);
  },
};
