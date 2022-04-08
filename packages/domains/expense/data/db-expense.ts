import { SortingCriteria } from "@nc/utils/types";
import { Op } from "sequelize";
import { Expense } from "../types";

export function findExpenses(userId: String, pageToken: Date, pageSize: Number, statuses: Array<String>, expenseIds: Array<String>, merchants: Array<String>, minAmount: Number, maxAmount: Number, currencies: Array<String>, sortingCriteria: Array<SortingCriteria<Expense>>): Promise<Array<Expense>> {

  let whereClauses = [];
  whereClauses.push({ user_id: { [Op.eq]: userId } });
  whereClauses.push({ date_created: { [Op.gt]: pageToken } })

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

  let orderClause = sortingCriteria.map(criteria => [criteria.field, criteria.order]);

  return Expense.findAll({
    where: {
      [Op.and]: whereClauses
    },
    order: orderClause,
    limit: pageSize
  });

}
