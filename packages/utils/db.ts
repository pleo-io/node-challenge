import config from 'config';
import postgres from 'postgres';

let db;

export function connect() {
  db = postgres(config.db);
  return db;
}

export function query(queryString: string) {
  if (!db) connect();

  return db`${queryString}`;
}
