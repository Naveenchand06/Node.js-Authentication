const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Getting the token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token (by decoding we get the payload (which is user ID))
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      console.log(req.user);

      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "Not Authorized catch" });
    }
  }

  if (!token) {
    res.status(401).json({ error: "Not Authorized" });
  }
});

module.exports = protect;
