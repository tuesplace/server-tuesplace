import "dotenv/config";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "tuesplace API",
      version: "0.2.0",
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
  },
  apis: ["./src/swagger-definitions/*.yaml", "./src/routes/*.yaml"],
};

export default swaggerJsdoc(options);
