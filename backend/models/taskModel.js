const mongoose = require('mongoose');

// Define the schema for a task
const taskSchema = mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high'], 
    default: 'medium' 
  },
  deadline: { 
    type: Date, 
    required: true 
  },
  assignedTo: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  dependencies: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Task' 
  }],
  comments: [
    {
      user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
      },
      comment: { 
        type: String, 
        required: true 
      },
      date: { 
        type: Date, 
        default: Date.now 
      },
    },
  ],
}, {
  timestamps: true // Optional: adds createdAt and updatedAt fields
});

// Create and export the Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
