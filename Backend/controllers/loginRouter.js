const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");
require("dotenv").config();

const signToken = (userTokenInfo) => {
  const token = jwt.sign(userTokenInfo, process.env.SECRET, {
    expiresIn: "1h",
  });

  return token;
};

loginRouter.post("/login", async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "Incorrect email or password",
    });
  }

  const token = signToken({
    email: user.email,
    id: user._id,
  });

  response
    .status(200)
    .send({ token, email: user.email, name: user.name, id: user._id });
});

loginRouter.post("/signup", async (request, response) => {
  const { email, name, password } = request.body;

  if (!(email && password)) {
    return response.status(400).json({
      error: "Email and password are required",
    });
  }

  if (email.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: "Email and password must be at least 3 characters long",
    });
  }

  // TODO: add regex checker for email format

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return response.status(400).json({
      error: "Email is already registered",
    });
  }

  //encrypt password
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    email,
    name,
    passwordHash,
  });

  await user.save();

  const token = signToken({
    email: user.email,
    id: user._id,
  });

  response
    .status(201)
    .json({ token, email: user.email, name: user.name, id: user._id });
});

module.exports = loginRouter;
