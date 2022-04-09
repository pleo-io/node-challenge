import { SortingCriteria, SortingEnum } from "@nc/utils/types";
import { Op } from "sequelize";
import { Expense } from "../types";

export function findExpenses(userId: String, pageToken: Date, pageSize?: Number, statuses?: Array<String>, expenseIds?: Array<String>, merchants?: Array<String>, minAmount?: Number, maxAmount?: Number, currencies?: Array<String>, sortingCriteria?: Array<SortingCriteria<Expense>>): Promise<Array<Expense>> {

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

  if (sortingCriteria == undefined || sortingCriteria == null || sortingCriteria.length == 0) {
    sortingCriteria = []
    sortingCriteria.push({ field: "date_created", order: SortingEnum.DESC });
  }

  let orderClause = sortingCriteria.map(criteria => [criteria.field, criteria.order]);

  if (pageSize == undefined || pageSize == null || pageSize == 0) {
    pageSize = 10;
  }

  return Expense.findAll({
    where: {
      [Op.and]: whereClauses
    },
    order: orderClause,
    limit: pageSize
  });

}

export async function insert(expenses: Array<Expense>): Promise<void> {
  return Expense.bulkCreate(expenses);
}

export function destroyUserExpenses(userIds: Array<String>): Promise<void> {
  return Expense.destroy({
    where: {
      user_id: { [Op.in]: userIds }
    }
  });
}

