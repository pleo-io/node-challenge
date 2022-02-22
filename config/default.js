const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: ['test', 'development', 'qa'].includes(process.env.NODE_ENV) ? path.resolve(__dirname, '..', `.env.${process.env.NODE_ENV}`) : undefined,
});

module.exports = {
  db: {
    host: process.env.DB_HOST || '0.0.0.0',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'challenge',
  },
  debug: {
    stackSize: process.env.DEBUG_STACK_SIZE || 4,
  },
  i18next: {
    translationFilePath: path.resolve(__dirname, '..', 'locales/{{lng}}/{{ns}}.json'),
  },
  host: 'localhost:9001',
  https: {
    enabled: process.env.HTTPS_ENABLED === 'true',
    key: process.env.HTTPS_KEY,
    cert: process.env.HTTPS_CERTIFICATE,
  },
  port: process.env.PORT || 9001,
  shutdown: {
    appKill: process.env.SHUTDOWN_KILL_IN_MILLISECONDS || 1000,
    serverClose: process.env.SHUTDOWN_SERVER_CLOSE_IN_MILLISECONDS || 100,
  },
};
