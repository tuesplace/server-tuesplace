const express = require("express");
const router = express.Router();
const { verifyPostExists, verifyMadePost } = require("../middleware");
const { createPost, getPosts, editPost, deletePost, reactToPost } = require("../controllers/post");

router.get("", getPosts);
router.post("", createPost);
router.put("/:postId", [verifyPostExists, verifyMadePost], editPost);
router.delete("/:postId", [verifyPostExists, verifyMadePost], deletePost);
router.patch("/:postId", [verifyPostExists], reactToPost);

module.exports = router;
