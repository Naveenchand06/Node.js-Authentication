const mongoose = require("mongoose");
const color = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/totodo");
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(e);
    process.exit(1);
  }
};

module.exports = connectDB;
