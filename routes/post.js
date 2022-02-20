const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware");
const { createPost, getPosts, editPost, deletePost } = require("../controllers/post");

router.get("/get-posts", getPosts);
router.post("/create-post", verifyToken, createPost);
router.patch("/edit-post", verifyToken, editPost);
router.delete("/delete-post", verifyToken, deletePost);

module.exports = router;
