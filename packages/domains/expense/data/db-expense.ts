import { IQuery } from '../types';
import { query } from '@nc/utils/db';

export function readUserExpenses({ userId, limit, page }: IQuery) {
  return query(
    `SELECT * FROM expenses 
     WHERE user_id = $1
     ORDER BY date_created DESC
     LIMIT $2
     OFFSET (($3 - 1) * $2)`,
    [userId, limit, (page * 1 || 1)]
  ).then((response) => response.rows);
}

export function countUserExpenses(userId: string) {
  return query('SELECT COUNT(*) FROM expenses WHERE user_id = $1', [userId])
    .then((response) => response.rows?.[0]);
}
