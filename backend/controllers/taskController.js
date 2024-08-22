const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');
const User = require('../models/userModel');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const { name, description, priority, deadline, assignedTo, dependencies } = req.body;

  // Optional: Validate fields
  if (!name || !priority) {
    res.status(400);
    throw new Error('Name and priority are required');
  }

  // Optional: Validate if assignedTo exists
  if (assignedTo) {
    const userExists = await User.findById(assignedTo);
    if (!userExists) {
      res.status(400);
      throw new Error('Assigned user does not exist');
    }
  }

  // Optional: Validate dependencies if they are tasks
  if (dependencies) {
    const invalidDependencies = await Promise.all(
      dependencies.map(async (dep) => !await Task.findById(dep))
    );
    if (invalidDependencies.some((isInvalid) => isInvalid)) {
      res.status(400);
      throw new Error('One or more dependencies are invalid');
    }
  }

  const task = new Task({
    name,
    description,
    priority,
    deadline,
    assignedTo,
    dependencies,
  });

  const createdTask = await task.save();

  res.status(201).json(createdTask);
});

module.exports = { createTask };
