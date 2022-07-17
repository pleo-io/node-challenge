import { IsInt, IsOptional, IsUUID, validate } from 'class-validator';

// Data Transfer Object for validating request data
interface Filters {
    merchant_name?: string
    date_from?: string
    date_to?: string
    status?: string
}

// Todo: create a dto for the filters so that we can validate them
// regex match for datetime

class GetUserExpensesRequestDTO {
    @IsUUID()
    public userId: string
    @IsOptional()
    @IsInt()
    public limit?: number
    @IsOptional()
    @IsInt()
    offset?: number
    @IsOptional()
    filters: Filters

    constructor(userId: string, limit: number = 50, offset: number = 0, filters?: Filters) {
      this.userId = userId;
      this.limit = limit;
      this.offset = offset;
      this.filters = filters;
    }

    public async validate() {
      const validationResult = await validate(this);
      // Todo: should be extracted as a util so that we can standardise dto error objects
      return validationResult.length > 0 ? validationResult.map((item) => ({
        property: item.property,
        constraints: Object.keys(item.constraints)
          .map((key) => item.constraints[key]),
      })) : null;
    }
}

export default GetUserExpensesRequestDTO;
