import { ApiError } from '@nc/utils/errors';
import { getUserDetails } from '../model';
import { getUserValidation } from '../validations/get-user';
import { Router } from 'express';
import { secureTrimJSON } from '../formatter';
import { to } from '@nc/utils/async';
import { validate } from '@nc/utils/request-validation';

export const router = Router();

router.get('/:id', validate(getUserValidation), async (req, res, next) => {
  const userId = req.params.id;
  const [userError, userDetails] = await to(getUserDetails(userId));

  if (userError) {
    return next(new ApiError(userError, userError.status, userError.message, userError.title, req));
  }

  return res.json(secureTrimJSON(userDetails));
});
