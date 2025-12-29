require("dotenv").config();
const connectDB = require("./config/db");
const redisClient = require("./config/redis");
const sessionMiddleware = require("./config/session");
const createApp = require("./app");

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await connectDB();
    await redisClient.connect();

    const app = createApp(sessionMiddleware);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Server failed to start:", err);
    process.exit(1);
  }
})();
