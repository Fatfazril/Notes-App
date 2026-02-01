const {createClient} = require('redis');

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
})

redisClient.on('connect' , () => {
  consolo.log('Redis Connected')
})
redisClient.on('error', (err) => {
    console.error('Redis error:', err);
})

(async ()=> {
  await redisClient.connect();
})

module.exports = redisClient;