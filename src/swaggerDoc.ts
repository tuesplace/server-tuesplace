import swaggerJsdoc from "swagger-jsdoc";
import { environment, port, serverUrl } from "./config";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "tuesplace API",
      version: "1.1.0",
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
        url: `${environment == "DEV" ? `${serverUrl}:${port}` : serverUrl}/api`,
      },
    ],
  },
  apis: ["./src/swagger-definitions/*.yaml", "./src/routes/v1/**/*.yaml"],
};

export default swaggerJsdoc(options);
