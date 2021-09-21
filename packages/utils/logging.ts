const enabled = (process.env.NODE_DEBUG || '').indexOf('DEBUG') > -1 && process.env.TEST_MODE !== 'test';
const pid = process.pid;

function print(namespace: string, level: string) {
  return function _namespacedPrint(message: any, context?: any) {
    if (enabled === false) return;
    process.stdout.write(JSON.stringify({
      'request-id': context?.id,
      'operation-id': context?.operationId,
      pid,
      app: 'api',
      level,
      message: `[${namespace}] ${message}`,
    }));
    process.stdout.write('\n');
  };
}

export default function debug(namespace: string) {
  if (typeof namespace !== 'string' || namespace.length < 1) throw new Error(`Logging namespace is not a string: ${namespace}\n\n`);

  return {
    log: print(namespace, 'log'),
    warn: print(namespace, 'warn'),
    error: print(namespace, 'error'),
  };
}
