const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");
require("dotenv").config();

loginRouter.post("/login", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: "1h",
  });

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

loginRouter.post("/register", async (request, response) => {
  const { username, name, password, email } = request.body;

  if (!(username && password)) {
    return response.status(400).json({
      error: "Username and password are required",
    });
  }

  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: "Username and password must be at least 3 characters long",
    });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: "Username is already registered",
    });
  }

  //encrypt password
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
    email,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = loginRouter;
