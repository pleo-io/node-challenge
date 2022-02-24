import { catchAsync } from '@nc/utils/async';
import { getExpensesEndPoint } from './expenses.controller';
import { Router } from 'express';

export const router = Router();
router.get('/get-expenses', catchAsync(getExpensesEndPoint));
