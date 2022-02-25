const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: ['test', 'dev', 'qa'].includes(process.env.NODE_ENV) ? path.resolve(__dirname, '..', `.env.${process.env.NODE_ENV}`) : undefined,
});

interface ConfigDefinition {
  host: string
  port: number
  https: {
    enabled: boolean
    key?: string
    cert?: string
  }
  db: {
    host: string
    port: number
    database: string
    user: string
    password: string
  }
  debug: {
    stackSize: number
  }
  shutdown: {
    appKill: number
    serverClose: number
  }

  i18next: {
    translationFilePath: any
  }
}

const config: ConfigDefinition = {
  db: {
    host: process.env.DB_HOST || '0.0.0.0',
    port: +process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'challenge',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  debug: {
    stackSize: +process.env.DEBUG_STACK_SIZE || 4,
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
  port: +process.env.PORT || 9001,
  shutdown: {
    appKill: +process.env.SHUTDOWN_KILL_IN_MILLISECONDS || 1000,
    serverClose: +process.env.SHUTDOWN_SERVER_CLOSE_IN_MILLISECONDS || 100,
  },
};

export default config;
