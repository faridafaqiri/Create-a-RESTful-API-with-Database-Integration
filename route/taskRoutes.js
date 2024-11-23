const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// POST a new task
router.post('/', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const newTask = await task.save();
    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// PUT: Update an existing task
router.put('/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    return res.json(updatedTask); // Ensured a return value
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// DELETE: Remove a task
router.delete('/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    return res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
