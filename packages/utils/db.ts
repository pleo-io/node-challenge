import config from 'config';
import { Client, QueryResult } from 'pg';

let db: Client;

export function connect(): Promise<void> {
  if (!db) {
    db = new Client(config.db);
    return db.connect();
  }
}

export async function query<T>(queryString: string, parameters?: unknown[]): Promise<QueryResult<T>> {
  if (!db) await connect();
  return db.query(queryString, parameters);
}

export async function close(): Promise<void> {
  if (db) { await db.end(); db = null; }
}
