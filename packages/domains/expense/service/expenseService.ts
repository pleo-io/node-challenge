import ExpenseModel from '../models/expenseModel';
import { GetUserExpensesRequestDTO, GetUserExpensesResponseDTO } from './dto';

const { Op } = require('sequelize');

class ExpenseService {
    private expenseModel: typeof ExpenseModel

    constructor(expenseModel = ExpenseModel) {
      this.expenseModel = expenseModel;
    }

    public async getUserExpensesPaginated(
      query: GetUserExpensesRequestDTO
    ) {
      const filters = query.filters;
      // Remove null filters
      Object.keys(filters)
        .forEach((filter) => {
          if (!filters[filter]) {
            delete filters[filter];
          }
        });
      let filterWhereClauses = {};
      // convert our filters to where clause objects
      if (filters) {
        filterWhereClauses = Object.keys(filters)
          .reduce((total: any, current: keyof typeof filters) => {
            switch (current) {
              case 'date_to':
                if (total.date_created) {
                  total.date_created = { ...total.date_created, ...{ [Op.lte]: filters.date_to } };
                  return { ...total };
                }
                return { ...total, ...{ date_created: { [Op.lte]: filters.date_to } } };
              case 'date_from':
                if (total.date_created) {
                  total.date_created = { ...total.date_created, ...{ [Op.gte]: filters.date_from } };
                  return { ...total };
                }
                return { ...total, ...{ date_created: { [Op.gte]: filters.date_from } } };
              case 'merchant_name':
                // Todo: We should probably sanitise the where expression for strings
                return filters.merchant_name ? { ...total, ...{ merchant_name: { [Op.iLike]: `%${filters.merchant_name}%` } } } : { ...total };
              case 'status':
                // Todo: We should probably sanitise the where expression for strings
                return filters.status ? { ...total, ...{ status: { [Op.eq]: filters.status } } } : { ...total };
              default:
                return { ...total };
            }
          }, {});
      }
      const results = await this.expenseModel.findAndCountAll({
        where: { user_id: query.userId, ...filterWhereClauses },
        order: [['date_created', 'DESC']],
        limit: query.limit,
        offset: query.offset,
      });
      return new GetUserExpensesResponseDTO(
        results.rows, results.count,
        query.offset > 0 ? query.offset - query.limit : 0,
        query.limit + query.offset >= results.count ? null : query.limit + query.offset
      );
    }
}

export default new ExpenseService();
