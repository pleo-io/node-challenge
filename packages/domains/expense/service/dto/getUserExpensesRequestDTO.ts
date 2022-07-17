import { IsInt, IsOptional, IsUUID, validate } from 'class-validator';

// Data Transfer Object for validating request data
interface Filters {
    merchant_name?: string
    date_from?: string
    date_to?: string
    status?: string
}

// Todo: create a dto for the filters so that we can validate them
// -regex match for datetime to iso format
// -perhaps run a sql sanitation uitl on each filter

class GetUserExpensesRequestDTO {
    @IsUUID()
    public readonly userId: string
    @IsOptional()
    @IsInt()
    public readonly limit?: number
    @IsOptional()
    @IsInt()
    public readonly offset?: number
    @IsOptional()
    public readonly filters: Filters

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
