require("dotenv/config");
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "tuesplace API",
      version: "0.0.1",
      description: "tuesplace API Documentation",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Tech Support",
        url: "https://tuesplace.com",
        email: "support@tuesplace.com",
      },
    },
    servers: [
      {
        url: `${process.env.SERVER_URL}:${process.env.PORT || 8888}/api`,
      },
    ],
    securityDefinitions: {
      authToken: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'header',
      },
    },
  },
  apis: ["./swagger-definitions.yaml", "./routes/*.yaml"],
};

module.exports = swaggerJsdoc(options);
