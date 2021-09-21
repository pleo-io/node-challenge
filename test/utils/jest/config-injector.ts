import config from 'config';

config.auth.jwtSecret = 'some-fake-key';

process.env.TEST_MODE = 'test';

process.on('unhandledRejection', (err: Error) => process.stderr.write(`unhandledRejection: ${err.stack}\n`));
