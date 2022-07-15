import { ApiError } from '@nc/utils/errors';
import { getUserDetails } from '../model';
import { Router } from 'express';
import { secureTrim } from '../formatter';
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
  res.header('content-type', 'application/json');
  return res.send(secureTrim(userDetails));
});
