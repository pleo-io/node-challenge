import context from './middleware/context';
import express, { Express } from 'express';

import helmet from 'helmet';
import security from './middleware/security';
import { router as userRoutes } from '@nc/domain-user';

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

  app.use(function(req, res) {
    res.status(404).end();
  });

  app.use(function(err, req, res) {
    res.status(500).json(err);
  });

  return app;
}
