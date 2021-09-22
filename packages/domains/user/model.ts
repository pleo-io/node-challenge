import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';
import { readUser } from './data/db-user';
import { to } from '@nc/utils/async';
import { format } from './formatter';

export async function getUserDetails(userId) {
    if (!userId) {
        throw BadRequest('userId property is missing.');
    }

    const [dbError, rawUser] = await to(readUser(userId));

    if (dbError) {
        throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
    }

    if (!rawUser) {
        throw NotFound(`Could not find user with id ${userId}`);
    }

    return format(rawUser);
}
