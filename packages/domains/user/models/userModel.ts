import * as Sequalize from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserAttributes {
  id: string
  first_name: string
  last_name: string
  company_name: string
  ssn: string
}

@Table({ tableName: 'users', createdAt: false, updatedAt: false })
class User extends Model<UserAttributes> implements UserAttributes {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequalize.UUIDV4,
  })
  id: string;
  @Column({ type: DataType.STRING })
  first_name: string;
  @Column({ type: DataType.STRING })
  last_name: string;
  @Column({ type: DataType.STRING })
  company_name: string;
  @Column({ type: DataType.STRING })
  ssn: string;
}

export default User;
