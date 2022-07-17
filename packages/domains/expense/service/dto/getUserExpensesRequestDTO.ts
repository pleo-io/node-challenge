import { IsInt, IsOptional, IsUUID, validate } from 'class-validator';

// Data Transfer Object for validating request data
class GetUserExpensesRequestDTO {
    @IsUUID()
    public userId: string
    @IsOptional()
    @IsInt()
    public limit?: number
    @IsOptional()
    @IsInt()
    offset?: number

    constructor(userId: string, limit: number = 50, offset: number = 0) {
      this.userId = userId;
      this.limit = limit;
      this.offset = offset;
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
