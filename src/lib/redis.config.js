import Redis from "ioredis";

class RedisStore {
  constructor() {
    this.redis = new Redis({
      redis: {
        port: 6379,
        host: "localhost",
        password: "3b4ee96eb6db293cab8",
      },
    });
  }
  async get(key) {
    const data = await this.redis.get(`SESSION:${key}`);
    return JSON.parse(data);
  }
  async set(key, sess, maxAge) {
    await this.redis.set(
      `SESSION:${key}`,
      JSON.stringify(sess),
      "EX",
      maxAge / 1000
    );
  }
  async destroy(key) {
    return await this.redis.del(`SESSION:${key}`);
  }
}
export default RedisStore;
