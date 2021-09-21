const fs = require('fs');

module.exports = {
  https: {
    enabled: true,
    key: fs.readFileSync('./certs/test-key.pem'),
    cert: fs.readFileSync('./certs/test-cert.pem'),
  },
};
