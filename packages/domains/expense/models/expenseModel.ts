import * as Sequalize from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface ExpenseAttributes {
  id: string
  merchant_name: string
  amount_in_cents: number
  currency: string
  user_id: string
  date_created: number
  status: string
}

@Table({ tableName: 'expenses', createdAt: false, updatedAt: false })
class Expense extends Model<ExpenseAttributes, ExpenseAttributes> implements ExpenseAttributes {
  @Column({ type: DataType.UUID, allowNull: false, primaryKey: true, defaultValue: Sequalize.UUIDV4 })
  id: string;
  @Column({ type: DataType.CHAR({ length: 255 }) })
  merchant_name: string;
  @Column({ type: DataType.INTEGER })
  amount_in_cents: number;
  @Column({ type: DataType.UUID, allowNull: false })
  user_id: string;
  @Column({ type: DataType.CHAR({ length: 10 }) })
  currency: string;
  @Column({ type: DataType.TIME, defaultValue: Sequalize.TIME })
  date_created: number;
  @Column({ type: DataType.CHAR({ length: 100 }) })
  status: string;
}

export default Expense;
