import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'test.com',
  username: 'app',
  password: 'main',
  database: 'demo',
});

