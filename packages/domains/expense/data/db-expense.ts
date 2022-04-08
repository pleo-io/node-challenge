import { Op } from "sequelize";
import { Expense } from "../types";

export function findExpenses(userId: String, pageToken: Date, pageSize: Number, orderBy: String, orderDir: String, statuses: Array<String>, expenseIds: Array<String>, merchants: Array<String>, minAmount: Number, maxAmount: Number, currencies: Array<String>): Promise<Array<Expense>> {

  let whereClauses = [];
  whereClauses.push({ user_id: { [Op.eq]: userId } });
  whereClauses.push({ date_created: { [Op.gt]: pageToken } })

  console.log(expenseIds)
  if (expenseIds)
    whereClauses.push({ id: { [Op.in]: expenseIds } })

  if (statuses)
    whereClauses.push({ status: { [Op.in]: statuses } });

  if (merchants)
    whereClauses.push({ merchant_name: { [Op.in]: merchants } });

  if (minAmount)
    whereClauses.push({ amount_in_cents: { [Op.gte]: minAmount } });

  if (maxAmount)
    whereClauses.push({ amount_in_cents: { [Op.lt]: maxAmount } });

  if (currencies)
    whereClauses.push({ currency: { [Op.in]: currencies } });

  let orderClause = [];
  if (orderBy && orderDir)
    orderClause.push({ orderBy, orderDir })

  return Expense.findAll({
    where: {
      [Op.and]: whereClauses
    },
    order: orderClause,
    limit: pageSize
  });

}
