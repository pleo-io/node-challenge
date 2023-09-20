import { expenseController } from '../expense.controller';
import { listExpenseValidation } from '../validations/list-expenses';
import { Router } from 'express';
import { validate } from '@nc/utils/request-validation';

export const router = Router();

router.get('/', validate(listExpenseValidation), expenseController.listExpenses);
