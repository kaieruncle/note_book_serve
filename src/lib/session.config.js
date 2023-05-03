import Store from "./redis.config";
export default {
  key: "koa:sess",
  maxAge: 24 * 60 * 60 * 1000 /**  session 过期时间，以毫秒ms为单位计算 。*/,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: false,
  rolling: true,
  renew: false,
  // store: new Store(),
};
