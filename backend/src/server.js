require("dotenv").config();

const connectDB = require("./config/db");
require("./config/redis"); // cukup require, JANGAN connect lagi
const sessionMiddleware = require("./config/session");
const createApp = require("./app");

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await connectDB();

    const app = createApp(sessionMiddleware);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`API docs at http://localhost:${PORT}/api/docs`);
    });
  } catch (err) {
    console.error("Server failed to start:", err);
    process.exit(1);
  }
})();
