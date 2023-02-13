import express, { Request } from "express";
import {
  Post,
  Group,
  Profile,
  Teacher,
  Admin,
  Student,
} from "../../definitions";
import {
  init,
  verifyInGroup,
  verifyResourceExists,
  verifyRole,
  verifyAccessToken,
} from "../../middleware";
import { activityRouter } from "./activity";
import { authRouter } from "./auth";
import { commentRouter } from "./comment";
import { groupRouter } from "./group";
import { markRouter } from "./mark";
import { messageRouter } from "./message";
import { postRouter } from "./post";
import { profileRouter } from "./profile";
import { roomRouter } from "./room";
import { submissionRouter } from "./submission";

const router = express.Router({ mergeParams: true });

router.use("/auth", init, authRouter);
router.use(
  "/groups/:groupId/posts/:postId/comments/",
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

router.use(
  "/groups/:groupId/posts/",
  init,
  verifyAccessToken,
  verifyResourceExists(Group, {
    resolveAttrs: () => ({
      type: "subject",
    }),
  }),
  verifyInGroup(Profile),
  postRouter
);

router.use(
  "/groups/:groupId/messages/",
  init,
  verifyAccessToken,
  verifyRole(Student),
  verifyResourceExists(Group, {
    resolveAttrs: () => ({
      type: "chat",
    }),
  }),
  verifyInGroup(Profile),
  messageRouter
);

router.use(
  "/marks/groups/:groupId/",
  init,
  verifyAccessToken,
  verifyRole(Teacher),
  verifyResourceExists(Group),
  verifyInGroup(Profile),
  markRouter
);

router.use(
  "/groups/:groupId/posts/:postId/submissions",
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

router.use("/groups/", init, verifyAccessToken, groupRouter);

router.use("/profiles", init, verifyAccessToken, profileRouter);

router.use("/rooms", init, verifyAccessToken, verifyRole(Admin), roomRouter);

router.use("/activities", init, verifyAccessToken, activityRouter);

export { router as v1Router };
