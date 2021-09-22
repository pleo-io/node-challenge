const fs = require('fs');

module.exports = {
  https: {
    enabled: true,
    key: fs.readFileSync('./certs/test-key.key'),
    cert: fs.readFileSync('./certs/test-cert.pem'),
  },
  shutdown: {
    appKill: 30000,
    serverClose: 15000,
  },
};
