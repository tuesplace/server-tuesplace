const express = require("express");
const router = express.Router();
const { verifyCommentExists, verifyMadeComment } = require("../middleware");
const {
  createComment,
  getComments,
  editComment,
  deleteComment,
  reactToComment,
} = require("../controllers/comment");

router.get("", getComments);
router.post("", createComment);
router.put("/:commentId", [verifyCommentExists, verifyMadeComment], editComment);
router.patch("/:commentId", [verifyCommentExists], reactToComment);
router.delete("/:commentId", [verifyCommentExists, verifyMadeComment], deleteComment);

module.exports = router;
