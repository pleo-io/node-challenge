import { router as expenseRoutes } from '@nc/domain-expense';
import { router as userRoutes } from '@nc/domain-user';
import gracefulShutdown from '@nc/utils/graceful-shutdown';
import Logger from '@nc/utils/logging';
import SequalizeInstance from '@nc/utils/sequalizeInstance';
import config from 'config';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { createServer as createHTTPServer, Server } from 'http';
import { createServer as createHTTPSServer, Server as SecureServer } from 'https';

import context from './middleware/context';
import security from './middleware/security';

const logger = Logger('server');
const app = express();
let serverReady = false;
const server: Server | SecureServer = (config.https.enabled === true) ? createHTTPSServer(config.https, app) : createHTTPServer(app);

gracefulShutdown(server);

app.use(helmet());
app.get('/readycheck', function readinessEndpoint(req, res) {
  const status = (serverReady) ? 200 : 503;
  res.status(status)
    .send(status === 200 ? 'OK' : 'NOT OK');
});

app.get('/healthcheck', function healthcheckEndpoint(req, res) {
  res.status(200)
    .send('OK');
});

app.use(context);
app.use(security);

app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function errorRequestHandler(err, req: Request, res: Response, next: NextFunction) {
  res.status(500)
    .json(err);
});

server.listen(config.port, () => {
  SequalizeInstance.sync()
    .then(() => {
      serverReady = true;
    });
  logger.log(`Server started on port ${config.port}`);
});

export default server;
