import { IsInt, IsOptional } from 'class-validator';

import Expense from '../../models/expenseModel';

class GetUserExpensesResponseDTO {
    @IsInt()
    public readonly count: number
    @IsOptional()
    @IsInt()
    public readonly prevOffset?: number
    @IsOptional()
    @IsInt()
    public readonly nextOffset: number
    public readonly data: Expense[]

    constructor(data: Expense[], count: number, prevOffset: number = null, nextOffset: number = null) {
      this.count = count;
      this.prevOffset = prevOffset;
      this.nextOffset = nextOffset;
      this.data = data;
    }
}

export default GetUserExpensesResponseDTO;
