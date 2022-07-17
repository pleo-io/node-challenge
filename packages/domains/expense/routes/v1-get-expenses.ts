import { Request, Router } from 'express';
import statusCode from 'http-status-codes';

import { GetUserExpensesRequestDTO } from '../service/dto';
import ExpenseService from '../service/expenseService';

export const router = Router();

router.get('/get-user-expenses/:userID',
  async (req: Request<{ userID: string }, any, any, { limit?: string, offset?: string }>,
    res) => {
    const dto = new GetUserExpensesRequestDTO(req.params.userID,
      req.query.limit && parseInt(req.query.limit),
      req.query.offset && parseInt(req.query.offset));
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
