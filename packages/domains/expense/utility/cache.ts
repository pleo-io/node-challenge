import memcache from "memory-cache";

export const cache = (duration) => {
  return (req, res, next) => {
    let key = "__express__" + req.originalUrl || req.url;
    let cacheBody = memcache.get(key);
    if (cacheBody) {
      return res.send(cacheBody);
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        memcache.put(key, body, duration * 1000);
        return res.sendResponse(body);
      };
      next();
    }
  };
};
