const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const http = require('http');
const socketio = require('socket.io');
const { swaggerUi, specs } = require('./swagger');
const cors = require('cors');

dotenv.config(); // Load environment variables

connectDB(); // Connect to the database

const app = express(); // Create Express app

app.use(cors()); // Use CORS middleware

app.use(express.json()); // Middleware to parse JSON

// Route handlers
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)); // Swagger API documentation

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000; // Default port or environment port

const server = http.createServer(app); // Create HTTP server
const io = socketio(server); // Attach Socket.io to the server

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
