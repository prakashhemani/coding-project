// swaggerConfig.js
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Title",
      version: "1.0.0",
      description: "A description of your API",
    },
    servers: [
      {
        url: "http://localhost:8080", // The base URL of your API
      },
    ],
  },
  apis: ["./../controllers/availability/index"], // Path to your API route files where Swagger comments are written
};

const specs = swaggerJsdoc(options);
module.exports = specs;
