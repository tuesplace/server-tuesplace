import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import swaggerUI from "swagger-ui-express";

import { errorHandler } from "./middleware";
import swaggerDoc from "./swaggerDoc";
import { mongoDBConnectionString, port } from "./config";
import { v1Router } from "./routes/v1";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1", v1Router);

app.use(
  "/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDoc, {
    customSiteTitle: "tuesplace API Docs",
  })
);

app.use(errorHandler);

mongoose.set("strictQuery", false);

mongoose
  .connect(mongoDBConnectionString)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
