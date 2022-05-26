const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc Create user
// @route POST api/users/
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
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});

// @desc Get a user data
// @route Get api/users/me
// access Private
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Not a valid data" });
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // console.log("User id", user.id); // 628e1a4406b90e89ec515d66
    // console.log("User _id", user._id); // ObjectId("628e1a4406b90e89ec515d66")

    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});

// @desc Create user
// @route Get api/users
// access Public
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get User" });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
