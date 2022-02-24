import {
  IsDate,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  ValidationOptions,
  registerDecorator,

} from 'class-validator';
import { SortingEnum, SortingType } from '@nc/utils/types';
import { Expenses } from './expenses.models';
import {
  Type,
} from 'class-transformer';

export class ExpensesQueryDTO {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  amount_in_cents?: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  date_created?: Date;

  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  merchant_name?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  page?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  pageSize?: number;

  @IsUUID()
  @IsOptional()
  user_id?: string;

  @IsOptional()
  @ValidateSorting()
  sorting?: SortingType<Expenses>;
}

function ValidateSorting(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isLongerThan',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (value === undefined) return true;

          if (value.field === undefined) return false;

          if (!['id', 'user_id', 'merchant_name', 'date_created', 'currency', 'amount_in_cents'].includes(value.field.trim())) { return false; }

          return (value.sort === undefined || [SortingEnum.ASCENDENT, SortingEnum.DESCENDENT].includes(value.sort));
        },
      },
    });
  };
}
