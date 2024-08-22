// Middleware to handle 404 errors
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); // Pass the error to the errorHandler middleware
  };
  
  // Middleware to handle all other errors
  const errorHandler = (err, req, res, next) => {
    // Set the status code to 500 if it is not already set
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
    // Send the error response
    res.status(statusCode).json({
      message: err.message, // Error message
      stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Stack trace in development mode only
    });
  };
  
  module.exports = { notFound, errorHandler };
  