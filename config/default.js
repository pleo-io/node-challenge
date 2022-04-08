require('dotenv').config();
const path = require('path');

module.exports = {
  db: {
    host: process.env.DB_HOST || '0.0.0.0',
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || 'postgres',
    database: process.env.DB_NAME || 'challenge',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
  debug: {
    stackSize: 4,
  },
  i18next: {
    translationFilePath: path.resolve(__dirname, '..', 'locales/{{lng}}/{{ns}}.json'),
  },
  host: process.env.HOST || '0.0.0.0',
  https: {
    enabled: false,
  },
  port: process.env.PORT || 9001,
  shutdown: {
    appKill: 1000,
    serverClose: 100,
  },
};
