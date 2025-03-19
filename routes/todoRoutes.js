const express = require("express");
const { getTodos, addTodo } = require("../controllers/todoController");

const router = express.Router();

router.get("/todos", getTodos);
router.post("/todos", addTodo);

module.exports = router;