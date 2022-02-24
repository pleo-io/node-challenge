import { BadRequest } from '@nc/utils/errors';
import { ExpensesQueryDTO } from './expenses.dtos';
import expensesServices from './expenses.services';
import { to } from '@nc/utils/async';
import { transformAndValidate } from 'class-transformer-validator';
import { Request, Response } from 'express';

export async function getExpensesEndPoint(request: Request, response: Response) {
  const [validationError, query] = await to(transformAndValidate<ExpensesQueryDTO>(ExpensesQueryDTO, request.query || {}), {});

  if (validationError) {
    const message = validationError.map((t) => t.toString()).join('');
    throw BadRequest(message);
  }

  const expenses = await expensesServices.getExpenses(query);

  return response.status(200).json(expenses);
}
