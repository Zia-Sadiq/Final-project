// swagger.js

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger configuration options
const options = {
  definition: {
    openapi: '3.0.0', // OpenAPI version
    info: {
      title: 'Task Management API', // API title
      version: '1.0.0', // API version
      description: 'A simple Express Task Management API', // API description
    },
  },
  apis: ['./routes/*.js'], // Path to API documentation comments
};

// Generate Swagger specifications
const specs = swaggerJsDoc(options);

module.exports = { swaggerUi, specs };
