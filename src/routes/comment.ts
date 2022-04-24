import express from "express";
const router = express.Router();
import { verifyCommentExists, verifyMadeComment } from "../middleware";
import {
  createComment,
  getComments,
  editComment,
  deleteComment,
  reactToComment,
} from "../controllers/comment";

router.get("", getComments);
router.post("", createComment);
router.put(
  "/:commentId",
  [verifyCommentExists, verifyMadeComment],
  editComment
);
router.patch("/:commentId", [verifyCommentExists], reactToComment);
router.delete(
  "/:commentId",
  [verifyCommentExists, verifyMadeComment],
  deleteComment
);

export default router;
