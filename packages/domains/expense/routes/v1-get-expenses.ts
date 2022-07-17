import { Request, Router } from 'express';
import statusCode from 'http-status-codes';

import { GetUserExpensesRequestDTO } from '../service/dto';
import ExpenseService from '../service/expenseService';

export const router = Router();

type QueryArgs = {
    limit?: string
    offset?: string
    merchant_name?: string
    date_from?: string
    date_to?: string
    status?: string
}
type RequestParams = { userID: string }

router.get('/get-user-expenses/:userID',
  async (req: Request<RequestParams, any, any, QueryArgs>,
    res) => {
    const dto = new GetUserExpensesRequestDTO(req.params.userID,
      req.query.limit && parseInt(req.query.limit),
      req.query.offset && parseInt(req.query.offset),
      {
        merchant_name: req.query.merchant_name,
        date_from: req.query.date_from,
        date_to: req.query.date_to,
        status: req.query.status,
      });
    const validationErrors = await dto.validate();
    if (validationErrors) {
      res.status(statusCode.BAD_REQUEST)
        .json({ errors: validationErrors });
    } else {
      ExpenseService.getUserExpensesPaginated(dto)
        .then((result) => res.json(result))
        .catch((err) => {
          res.status(statusCode.INTERNAL_SERVER_ERROR)
            .send(err);
        });
    }
  });
