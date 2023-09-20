import config from 'config';
import Knex from 'knex';

export const knexClient = Knex({
  client: 'pg',
  connection: config.db,
  pool: { min: 1, max: 5 },
  acquireConnectionTimeout: 10000,
});
