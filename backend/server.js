const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 6000;
const connectDB = require("./config/db");

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/todos", require("./routes/todoRoutes"));

app.listen(port, () => console.log(`Server started at port ${port}`));
