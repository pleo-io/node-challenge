require('dotenv').config();
const Joi = require('joi');
const path = require('path');

const schema = Joi.object({
  DB_NAME: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.string().required(),
  HOST: Joi.string().required(),
  PORT: Joi.string().required(),
});

const { error, value } = schema.validate(process.env);
if (error) throw new Error(`Config validation failed ${error.message}`);

module.exports = {
  db: {
    host: value.DB_HOST,
    port: value.DB_PORT,
    database: value.DB_NAME,
  },
  debug: {
    stackSize: 4,
  },
  i18next: {
    translationFilePath: path.resolve(__dirname, '..', 'locales/{{lng}}/{{ns}}.json'),
  },
  host: value.HOST,
  https: {
    enabled: false,
  },
  port: value.PORT,
  shutdown: {
    appKill: 1000,
    serverClose: 100,
  },
};
