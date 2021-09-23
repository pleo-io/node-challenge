import { randomUUID } from 'crypto';

export default function context(req, res, next) {
  const requestId = req.headers['x-request-id'] || randomUUID();
  req.id = requestId;
  res.setHeader('x-request-id', requestId);

  next();
}
