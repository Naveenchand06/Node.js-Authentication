const express = require("express");
const router = express.Router();
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const protect = require("../middlewares/authMiddleware");

router.get("/", protect, getTodos);

router.post("/", protect, createTodo);

router.put("/:id", protect, updateTodo);

router.delete("/:id", protect, deleteTodo);

module.exports = router;
