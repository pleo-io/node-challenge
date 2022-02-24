import 'reflect-metadata';
import context from './middleware/context';
import { router as expensesRoutes } from '@nc/domain-expense';
import helmet from 'helmet';
import security from './middleware/security';
import error from './middleware/error';
import { router as userRoutes } from '@nc/domain-user';
import express, { Express } from 'express';

export function createExpressApplication(): Express {
  const app = express();

  app.use(helmet());

  app.use(context);
  app.use(security);

  app.get('/readycheck', function readinessEndpoint(req, res) {
    // TODO: Add terminus to check for readiness
    const status = 200;

    res.status(status).send(status === 200 ? 'OK' : 'NOT OK');
  });

  app.get('/healthcheck', function healthcheckEndpoint(req, res) {
    res.status(200).send('OK');
  });

  app.use('/user', userRoutes);
  app.use('/expenses', expensesRoutes);

  app.use(function(req, res) {
    res.status(404).end();
  });

  app.use(error);
  return app;
}
