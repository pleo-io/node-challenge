import { createExpressApplication } from '../../../app';
import request from 'supertest';

export const Api = request(createExpressApplication());
