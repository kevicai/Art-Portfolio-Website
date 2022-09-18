const config = require("./utils/config");
const express = require("express");
// eliminates the need for try catch for async errors
require("express-async-errors");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blogsRouter");
const usersRouter = require("./controllers/usersRouter");
const loginRouter = require("./controllers/loginRouter");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

logger.info("connecting to MongoDb");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

if (config.NODE_ENV === "production") {
  app.use(express.static("build"));
}

app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/blogs", middleware.userExtractor, blogsRouter);
app.use("/api/users", middleware.userExtractor, usersRouter);
app.use("/api", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
