const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    author: 1,
    content: 1,
    type: 1,
    stage: 1,
    reference: 1,
  });
  response.json(users);
});

module.exports = usersRouter;
