const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Todo = require("../models/todoModel");

// @desc GET Todos
// @route GET api/todos
// access Private
const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json(todos);
});

// @desc SET Todo
// @route POST api/todos
// access Private
const createTodo = asyncHandler(async (req, res) => {
  if (!req.body.todoitem) {
    res.status(400).json({ error: "Not a valid value" });
  }
  const todo = await Todo.create({
    todoitem: req.body.todoitem,
    test: "test text",
  });
  res.status(200).json(todo);
});

// @desc Update Todo
// @route PUT api/todos
// access Private
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400).json({ error: "No such todo found" });
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedTodo);
});

// @desc DELETE Todo
// @route DELETE api/todos
// access Private
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400).json({ error: "No such todo found" });
  }
  todo.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
