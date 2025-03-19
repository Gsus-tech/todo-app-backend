const Todo = require("../models/Todo");

// Get all todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new todo
const addTodo = async (req, res) => {
  try {
    const { text, completed } = req.body;
    const newTodo = new Todo({
      text,
      completed,
    });
    await newTodo.save();
    res.json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getTodos, addTodo };