const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    author: 1,
    content: 1,
    type: 1,
    stage: 1,
    reference: 1,
    created_at: 1,
  });
  response.json(users);
});

usersRouter.get("/blogs", async (request, response) => {
  const user = request.user; // request.user extracted through middleware
  const returnedUser = await User.findById(user.id).populate("blogs", {
    author: 1,
    content: 1,
    type: 1,
    stage: 1,
    reference: 1,
    created_at: 1,
  });
  response.json(returnedUser);
});

module.exports = usersRouter;
