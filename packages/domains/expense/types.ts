import sequelize from "@nc/utils/db";
import { SortingCriteria } from "@nc/utils/types";
import { IsDateString, IsInt, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';

const { Model, DataTypes } = require('sequelize');

export class Expense extends Model { }
Expense.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    merchant_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    amount_in_cents: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    date_created: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
}, {
    sequelize,
    tableName: 'expenses',
    timestamps: false
});

export class SearchExpensesRequest {

    @IsString()
    userId: String

    @IsDateString()
    pageToken: Date

    @IsInt()
    @IsPositive()
    @IsOptional()
    pageSize: Number

    @IsString({ each: true })
    @IsOptional()
    statuses: Array<String>

    @IsString({ each: true })
    @IsOptional()
    expenseIds: Array<String>

    @IsString({ each: true })
    @IsOptional()
    merchants: Array<String>

    @IsInt()
    @IsOptional()
    minAmount: Number

    @IsInt()
    @IsOptional()
    maxAmount: Number

    @IsString({ each: true })
    @IsOptional()
    currencies: Array<String>

    // TODO: register custom validator
    sortBy: Array<SortingCriteria<Expense>>
}
