import config from 'config';

process.on('unhandledRejection', (err: Error) => process.stderr.write(`unhandledRejection: ${err.stack}\n`));
