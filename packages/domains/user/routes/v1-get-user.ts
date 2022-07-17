import { to } from '@nc/utils/async';
import { ApiError } from '@nc/utils/errors';
import { Router } from 'express';

import { secureTrim } from '../formatter';
import { getUserDetails } from '../model';

export const router = Router();

router.get('/get-user-details', async (req, res, next) => {
  const [userError, userDetails] = await to(getUserDetails(req.query?.userId));

  if (userError) {
    return next(new ApiError(userError, userError.status, `Could not get user details: ${userError}`, userError.title, req));
  }

  if (!userDetails) {
    res.status(404);
    return res.send('User not found');
  }
  res.header('content-type', 'application/json');
  return res.send(secureTrim(userDetails));
});
