import Redis from "ioredis"

const redis =  new Redis(process.env.REDIS_URL!)
console.log("Redis connection opened")
export default redis;