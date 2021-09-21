/**
 * Entry point for the application
 * Sets up a few global settings and tools before initiating
 * the Typescript transpilation and loading the main app router in `server.ts`
 */

// Helps with fs, http and dns (needs to be invoked before anything else)
process.env.UV_THREADPOOL_SIZE = 256;

// Optional DNS in-memory cache, you may want to use an OS-level app like `nscd`
require('ha-dns-cache')({ ttl: 5000, limit: 500 });

// Uses ts-node to transpile ts files to js at runtime
require('ts-node')
  // Skip type check to speed up warm time and reduce memory usage
  .register({ transpileOnly: true });

require('./server.ts');
