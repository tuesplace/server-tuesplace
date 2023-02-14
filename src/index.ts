import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const server = createServer(app);
const io = new Server(server, {});

import { errorHandler } from "./middleware";
import swaggerDoc from "./swaggerDoc";
import { mongoDBConnectionString, port } from "./config";
import { v1Router } from "./routes/v1";
import { verifyAccessToken } from "./util";

app.use((req, _res, next) => {
  req.io = io;
  next();
});

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

io.use(async (socket, next) => {
  try {
    if (await verifyAccessToken(socket.request.headers.authorization)) {
      next();
    }
  } catch (err) {
    io.emit("error", err);
  }
});

mongoose
  .connect(mongoDBConnectionString)
  .then(() => {
    io.on("connection", (socket) => {
      socket.emit("message", "[connected]");
    });

    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
