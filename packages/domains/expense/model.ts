import { format } from "./formatter";
import { readUserExpenses } from "./data/db-expense";
import { to } from "@nc/utils/async";
import { Expense } from "./types";
import { BadRequest, InternalError, NotFound } from "@nc/utils/errors";

export async function getExpensesForUser(userId) {
  if (!userId) {
    throw BadRequest("userId property not provided.");
  }

  const [dbError, rawExpense] = await to(readUserExpenses(userId));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawExpense) {
    throw NotFound(`Could not find any expense related to this user ${userId}`);
  }

  const expense_ = rawExpense.map((expense: Expense) => format(expense));

  return expense_;
}
