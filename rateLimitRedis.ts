import { Redis } from 'ioredis';
import { RedisStore } from 'rate-limit-redis';

export const createRedisClient = () => {
  const url = process.env.REDIS_URL || 'redis://localhost:6379';
  return new Redis(url);
};

export const createRedisStore = () => {
  const client = createRedisClient();
  return new RedisStore({
    sendCommand: (...args: string[]) => client.call(...args),
    prefix: 'rl:',
  });
};
