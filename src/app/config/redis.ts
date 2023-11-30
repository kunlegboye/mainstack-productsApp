import dotenv from 'dotenv'
import * as redis from 'redis';

dotenv.config();

const port: number = Number((process.env.REDIS_PORT)as string);
const host: string = process.env.REDIS_HOST as string;


// redis connection
const redisClient = redis.createClient({
  socket:{
  host,
  port
},
  password: process.env.REDIS_PASSWORD as string,
});
redisClient.connect()

redisClient.on('error', err => {
  console.error(err);
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

export default redisClient;
