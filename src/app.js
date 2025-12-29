const express = require("express");
const noteRoutes = require("./routes/noteRoutes");
const errorHandler = require("./middlewares/errorHandler");
const { swaggerUi, swaggerSpec } = require("./docs");

module.exports = function createApp(sessionMiddleware) {
  const app = express();

  app.use(express.json());
  app.use(sessionMiddleware);

  app.use("/api/notes", noteRoutes);
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use(errorHandler);

  return app;
};
