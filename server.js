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


// ****************************************************
// **   User handling
// ****************************************************

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

// Login Route
app.post('/api/user/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.status(200).json({ 
      success: true, 
      message: 'Login successful', 
      token 
    });

  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Error logging in' 
    });
  }
});


// Signup Route
app.post('/api/user/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is already registered.' 
      });
    }

    // Hash the password before saving to DB
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a new user with all necessary fields
    const newUser = new User({
      firstName,
      lastName,
      email,
      passwordHash,
      status: 'active', // Set default status
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Save the new user to the database
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error during signup:', err); // Log the error
    res.status(500).json({ error: 'Error signing up' });
  }
});




