import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import swaggerUI from "swagger-ui-express";

import {
  authRouter,
  profileRouter,
  postRouter,
  groupRouter,
  commentRouter,
  markRouter,
} from "./routes";
import {
  errorHandler,
  verifyToken,
  verifyGroupExists,
  verifyInGroup,
  verifyPostExists,
  resSender,
  verifyGroupRedactor,
} from "./middleware";
import swaggerDoc from "./swaggerDoc";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(resSender);
app.use("/api/profile", profileRouter);
app.use("/api/auth", authRouter);
app.use("/api/group", verifyToken, groupRouter);
app.use(
  "/api/group/:groupId/post",
  verifyToken,
  verifyGroupExists,
  verifyInGroup,
  postRouter
);
app.use(
  "/api/group/:groupId/post/:postId/comment",
  verifyToken,
  verifyGroupExists,
  verifyInGroup,
  verifyPostExists,
  commentRouter
);
app.use(
  "/api/group/:groupId/mark",
  verifyToken,
  verifyGroupExists,
  verifyInGroup,
  verifyGroupRedactor,
  markRouter
);
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDoc, {
    customSiteTitle: "tuesplace API Docs",
  })
);
app.use(errorHandler);
app.use(express.static("./assets"));

mongoose
  .connect(process.env.MONGO_DB_CONNECTION_STRING!)
  .then(() => {
    const port = process.env.PORT || 8888;

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
