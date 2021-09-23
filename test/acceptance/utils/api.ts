import { agent } from 'supertest';
import config from 'config';

export const Api = agent(process.env.API_URL_OVERRIDE || `${config.https?.enabled ? 'https://' : 'http://'}${config.host}`);
