import { query } from '@nc/utils/db';

export function readUser(userId) {
    return query(`SELECT * FROM users WHERE id = ${userId}`);
}
