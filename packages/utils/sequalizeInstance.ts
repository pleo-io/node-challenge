import ExpenseModel from '@nc/domain-expense/models/expenseModel';
import UserModel from '@nc/domain-user/models/userModel';
import config from 'config';
import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  host: config.db.host,
  database: config.db.database,
  port: config.db.port,
  dialect: 'postgres',
  username: config.db.user,
  password: config.db.password,
  models: [UserModel, ExpenseModel],
});

export default sequelize;
