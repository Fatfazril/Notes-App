const express = require('express');
const noteRoutes = require("./routes/noteRoutes");
const errorHandler = require("./middlewares/errorHandler");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const redisClient = require("./config/redis");
const { swaggerUi, swaggerSpec } = require("./docs");



const app = express();

// Middleware
app.use(express.json());

// Session
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        }
    })
);

// Routes
app.use("/api/notes", noteRoutes);

// Error Middleware
app.use(errorHandler);
// Swagger Docs
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


module.exports = app;
