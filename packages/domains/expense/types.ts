import sequelize from "@nc/utils/db";

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
        type: DataTypes.STRING,
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

export interface SearchExpensesRequest {
    userId: String
    pageToken: Date
    pageSize: Number
    orderBy: String
    orderDir: String
    statuses: Array<String>
    expenseIds: Array<String>
    merchants: Array<String>
    minAmount: Number
    maxAmount: Number
    currencies: Array<String>
}
