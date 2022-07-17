import { BadRequest, InternalError } from '@nc/utils/errors';
import { readUser } from './service/db-user';
import { User } from './types';

export async function getUserDetails(userId): Promise<User> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }
  try {
    return await readUser(userId);
  } catch (error) {
    throw InternalError(`Error fetching data from the DB: ${error.message}`);
  }
}
