import config from 'config';
import stoppable from 'stoppable';

const shutdownRoutine = {
  active: false,
  ...config.shutdown,
};

function shutdown(server, onShutdown?: (server) => any) {
  if (!shutdownRoutine.active) {
    shutdownRoutine.active = true;
    server.ready = false;
    if (onShutdown) onShutdown(server);
    setTimeout(server.stop, shutdownRoutine.serverClose);
  }
}

function shutdownRequest(signal: string, server, onShutdown?: (server) => any) {
  return () => {
    process.stderr.write(signal);
    shutdown(server, onShutdown);
  };
}

export default function gracefulShutdown(server, onShutdown?: (server) => any) {
  // Modern http compatibility layer
  server.close = server.close || server.stop;

  process.on('SIGTERM', shutdownRequest('SIGTERM', server, onShutdown));
  process.on('SIGINT', shutdownRequest('SIGINT', server, onShutdown));

  return stoppable(server, shutdownRoutine.appKill - shutdownRoutine.serverClose);
}
