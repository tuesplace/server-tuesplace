const express = require("express");
const router = express.Router();
const { verifyToken, verifyInGroup, verifyMadePost } = require("../middleware");
const { createPost, getPosts, editPost, deletePost, toggleLike } = require("../controllers/post");

router.get("/:groupId/post", [verifyToken, verifyInGroup], getPosts);
router.post("/:groupId/post", [verifyToken, verifyInGroup], createPost);
router.put("/:groupId/post/:postId", [verifyToken, verifyInGroup, verifyMadePost], editPost);
router.delete("/:groupId/post/:postId", [verifyToken, verifyInGroup, verifyMadePost], deletePost);
router.patch("/:groupId/post/:postId", [verifyToken, verifyInGroup], toggleLike);

module.exports = router;
