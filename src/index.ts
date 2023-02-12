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
  activityRouter,
  roomRouter,
  submissionRouter,
} from "./routes";
import {
  errorHandler,
  verifyAccessToken,
  verifyRole,
  init,
  verifyResourceExists,
  verifyInGroup,
} from "./middleware";
import swaggerDoc from "./swaggerDoc";
import { Admin, Group, Post, Profile, Teacher } from "./definitions";
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
  "/api/groups/:groupId/posts/:postId/comments/",
  init,
  verifyAccessToken,
  verifyResourceExists(Group),
  verifyInGroup(Profile),
  verifyResourceExists(Post, {
    resolveAttrs: (context: Request) => ({
      "associations.group._id": context.ids!.groupId,
    }),
  }),
  commentRouter
);

app.use(
  "/api/groups/:groupId/posts/",
  init,
  verifyAccessToken,
  verifyResourceExists(Group),
  verifyInGroup(Profile),
  postRouter
);

app.use(
  "/api/marks/groups/:groupId/",
  init,
  verifyAccessToken,
  verifyRole(Teacher),
  verifyResourceExists(Group),
  verifyInGroup(Profile),
  markRouter
);

app.use(
  "/api/groups/:groupId/posts/:postId/submissions",
  init,
  verifyAccessToken,
  verifyResourceExists(Group),
  verifyInGroup(Profile),
  verifyResourceExists(Post, {
    resolveAttrs: (context) => ({
      "associations.group._id": context.ids!.groupId,
      "assignmentInfo.isAssignment": true,
    }),
  }),
  submissionRouter
);

app.use("/api/groups/", init, verifyAccessToken, groupRouter);

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDoc, {
    customSiteTitle: "tuesplace API Docs",
  })
);

app.use("/api/profiles", init, verifyAccessToken, profileRouter);

app.use("/api/rooms", init, verifyAccessToken, verifyRole(Admin), roomRouter);

app.use("/api/activities", init, verifyAccessToken, activityRouter);

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
