import express from "express";
const router = express.Router();
import { verifyPostExists, verifyMadePost } from "../middleware";
import {
  createPost,
  getPosts,
  editPost,
  deletePost,
  reactToPost,
} from "../controllers/post";

router.get("", getPosts);
router.post("", createPost);
router.put("/:postId", [verifyPostExists, verifyMadePost], editPost);
router.delete("/:postId", [verifyPostExists, verifyMadePost], deletePost);
router.patch("/:postId", [verifyPostExists], reactToPost);

export default router;
