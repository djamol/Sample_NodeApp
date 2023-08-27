const { sequelize } = require('./src/config/database');

const app = require('./app');

beforeAll(async () => {
  await sequelize.sync(); 
});

afterAll(async () => {
  await sequelize.close(); 
});

global.app = app; 
