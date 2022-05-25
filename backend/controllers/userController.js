const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc Create user
// @route POST api/users/login
// access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // check that all datas are available
  if (!name || !email || !password) {
    res.status(400).json({ message: "Invalid Data" });
  }

  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res
      .status(400)
      .json({ message: "User already exists, please try to log in" });
  }

  // Hash Password
  const salt = await bcrypt.genSalt(12);
  const hashedPass = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name,
    email: email,
    password: hashedPass,
  });

  if (user) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});

// @desc Get a user data
// @route Get api/users/me
// access Private
const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Login User" });
});

// @desc Create user
// @route Get api/users
// access Public
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get User" });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
