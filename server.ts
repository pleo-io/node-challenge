import config from 'config';
import context from './middleware/context';
import gracefulShutdown from '@nc/utils/graceful-shutdown';
import helmet from 'helmet';
import Logger from '@nc/utils/logging';
import security from './middleware/security';
import { router as userRoutes } from '@nc/domain-user';
import { createServer as createHTTPServer, Server } from 'http';
import {
  createServer as createHTTPSServer,
  Server as SecureServer,
} from 'https';
import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express';

const logger = Logger('server');
const app = express();

const server: Server | SecureServer =
  config.https.enabled === true
    ? createHTTPSServer(config.https, app as any)
    : createHTTPServer(app as any);
server.ready = false;

gracefulShutdown(server);

app.use(helmet());
app.get('/readycheck', function readinessEndpoint(_req: Request, res: Response) {
  const status = server.ready ? 200 : 503;
  res.status(status).send(status === 200 ? 'OK' : 'NOT OK');
});

app.get(
  '/healthcheck',
  function healthcheckEndpoint(_req: Request, res: Response) {
    res.status(200).send('OK');
  }
);

app.use(context);
app.use(security);

app.use('/user', userRoutes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function(err: any, _req: Request, res: Response, _next: NextFunction) {
  res.status(err.status || 500).json(err);
}) as unknown as ErrorRequestHandler;

server.listen(config.port, () => {
  server.ready = true;
  logger.log(`Server started on port ${config.port}`);
});

export default server;
