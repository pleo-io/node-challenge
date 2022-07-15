const defaultSettings = require('./default');
module.exports = {
  ...defaultSettings,
  db: {
    host: 'db', // Docker compose internal network
    port: 5432,
    database: 'challenge',
    user: 'postgres',
    password: 'postgres',
  },
};
