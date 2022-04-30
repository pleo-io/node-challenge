import { secureTrim } from "@nc/domain-expense/formatter";
import { to } from "@nc/utils/async";
import { getExpensesForUser } from "@nc/domain-expense/model";
import { ApiError } from "@nc/utils/errors";
import { Middleware } from "../../types";

export const handlerFunction: Middleware = async (req, res, next) => {
  const [error, expensesForUser] = await to(
    getExpensesForUser(req.query?.userId)
  );

  if (error) {

    return next(
      new ApiError(
        error,
        error.status,
        `Could not get requested data`,
        error.title,
        req
      )
    );
  }

  if (!expensesForUser) {
    return res.json({});
  }

  return res.json(secureTrim(expensesForUser));

};
