const session = require("express-session");
const { RedisStore } = require("connect-redis");
const redisClient = require("./redis");

const sessionConfig = session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
});

module.exports = sessionConfig;
