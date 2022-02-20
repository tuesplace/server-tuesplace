const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware");
const { createPost, getPosts, editPost, deletePost, toggleLike } = require("../controllers/post");

router.get("/get-posts", getPosts);
router.post("/create-post", verifyToken, createPost);
router.patch("/edit-post", verifyToken, editPost);
router.delete("/delete-post", verifyToken, deletePost);
router.patch("/like-post", verifyToken, toggleLike);

module.exports = router;
