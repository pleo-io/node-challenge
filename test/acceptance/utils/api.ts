import { agent } from 'supertest';
import config from 'config';

export const Api = agent(process.env.API_URL_OVERRIDE || `${config.server.https ? 'https://' : 'http://'}${config.server.host}`);

export const ApiGateway = agent(process.env.API_URL_OVERRIDE || `${config.gateway.https ? 'https://' : 'http://'}${config.gateway.host}`);
