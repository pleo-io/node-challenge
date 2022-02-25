import config from './config';
import { createExpressApplication } from './app';
import gracefulShutdown from '@nc/utils/graceful-shutdown';
import Logger from '@nc/utils/logging';
import { createServer as createHTTPServer, Server } from 'http';
import { createServer as createHTTPSServer, Server as SecureServer } from 'https';

(function() {
  const logger = Logger('server');
  const app = createExpressApplication();
  const server: Server | SecureServer = (config.https.enabled === true) ? createHTTPSServer(config.https, app as any) : createHTTPServer(app as any);

  gracefulShutdown(server);
  server.listen(config.port, () => {
    logger.log(`Server started on port ${config.port}`);
  });

  return server;
}());
