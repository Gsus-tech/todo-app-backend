require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Todo = require("./models/Todo");

const app = express();
app.use(express.json());
app.use(cors());

// Stablish connection to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));


// READ
app.get("/api/todos", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: "Error fetching todos" });
    }
});

// WRITE
app.post("/api/todos", async (req, res) => {
    try {
        const newTodo = new Todo(req.body);
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ error: "Error creating todo" });
    }
});

// UPDATE
app.put('/api/todos/:id', async (req, res) => {
    const { status } = req.body;
  
    if (!['todo', 'in-progress', 'completed'].includes(status)) {
      return res.status(400).send('Invalid status');
    }
  
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );
      res.json(updatedTodo);
    } catch (error) {
      res.status(500).send('Error updating todo');
    }
});
  
// DELETE
app.delete("/api/todos/:id", async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting todo" });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
