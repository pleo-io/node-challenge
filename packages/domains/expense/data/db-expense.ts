/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable sort-imports */
import { query } from "@nc/utils/db";
import { ExpenseQuery } from "../types";

export function readUserExpenses(userId: string) {
  return query("SELECT * FROM expenses WHERE user_id = $1", [userId]).then(
    (response) => {
      console.log(response.rows);
      return response.rows;
    }
  );
}
