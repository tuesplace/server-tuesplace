import express, { Request } from "express";
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
  verifyAccessToken,
  verifyYoungToken,
  verifyRole,
  init,
  verifyResourceExists,
  verifyInGroup,
} from "./middleware";
import swaggerDoc from "./swaggerDoc";
import { Group, Post, Teacher } from "./definitions";
import { mongoDBConnectionString, port } from "./config";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/auth", init, authRouter);
app.use(
  "/api/group/:groupId/post/:postId/comment/",
  init,
  verifyAccessToken,
  verifyResourceExists(Group),
  verifyInGroup(),
  verifyResourceExists(Post, {
    resolveAttrs: (context: Request) => ({
      association: { group: { _id: context.ids!.groupId } },
    }),
  }),
  commentRouter
);

app.use(
  "/api/group/:groupId/post/",
  init,
  verifyAccessToken,
  verifyResourceExists(Group),
  verifyInGroup(),
  postRouter
);

app.use(
  "/api/mark/group/:groupId/",
  init,
  verifyAccessToken,
  verifyRole(Teacher),
  verifyResourceExists(Group),
  verifyInGroup(),
  markRouter
);

app.use("/api/group/", init, verifyAccessToken, groupRouter);

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDoc, {
    customSiteTitle: "tuesplace API Docs",
  })
);

app.use(
  "/api/profile/",
  init,
  verifyAccessToken,
  verifyYoungToken,
  profileRouter
);
app.use(errorHandler);

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
