import { ApiError } from '@nc/utils/errors';
import { getUserDetails } from '../model';
import { redactSensitiveFields } from '../formatter';
import { Router } from 'express';
import { to } from '@nc/utils/async';

export const router = Router();

router.get('/get-user-details', async (req, res, next) => {
  const [userError, userDetails] = await to(getUserDetails(req.query?.userId));

  if (userError) {
    return next(new ApiError(userError, userError.status, `Could not get user details: ${userError}`, userError.title, req));
  }

  if (!userDetails) {
    return res.json({});
  }

  return res.json(redactSensitiveFields(userDetails));
});
