import ExpenseModel from '../models/expenseModel';
import { GetUserExpensesRequestDTO, GetUserExpensesResponseDTO } from './dto';

class ExpenseService {
    private expenseModel: typeof ExpenseModel

    constructor(expenseModel = ExpenseModel) {
      this.expenseModel = expenseModel;
    }

    public async getUserExpensesPaginated(
      query: GetUserExpensesRequestDTO
    ) {
      const results = await this.expenseModel.findAndCountAll({
        where: { user_id: query.userId },
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
