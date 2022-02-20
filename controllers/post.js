const Profile = require("../models/Profile");
const Post = require("../models/Post");
const { validatePost } = require("../util/validators");

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    res.send({ success: true, response: { posts } });
  } catch (err) {
    next(err);
  }
};

const createPost = async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.auth.userId);
    if (!profile) {
      throw { profile: "Profile does not exist" };
    }

    const { body } = req.body;
    const { errors, valid } = validatePost({ body });
    if (!valid) {
      throw { ...errors, status: 400 };
    }

    const post = await Post.create({
      authorId: req.auth.userId,
      body,
    });
    res.send({ success: true, response: { post: { ...post._doc } } });
  } catch (err) {
    next(err);
  }
};

const editPost = async (req, res, next) => {
  try {
    const { body, postId } = req.body;
    const profile = await Profile.findById(req.auth.userId);
    if (!profile) {
      throw { profile: "Profile does not exist", status: 404 };
    }

    const post = await Post.findById(postId);
    if (!post) {
      throw { post: "Post not found", status: 404 };
    }
    if (post.authorId !== profile.id) {
      throw { author: "Only the author can edit this post", status: 401 };
    }

    const { errors, valid } = validatePost({ body });
    if (!valid) {
      throw { ...errors, status: 400 };
    }

    post.body = body || "";
    await post.save();
    res.send({ success: true, response: { post: { ...post._doc } } });
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.body;
    const profile = await Profile.findById(req.auth.userId);
    if (!profile) {
      throw { profile: "Profile does not exist", status: 404 };
    }
    const post = await Post.findById(postId);
    if (!post) {
      throw { post: "Post not found", status: 404 };
    }
    if (post.authorId !== profile.id) {
      throw { author: "Only the author can edit this post", status: 401 };
    }

    await post.deleteOne();
    res.status(204).send({ success: true });
  } catch (err) {
    next(err);
  }
};

const toggleLike = async (req, res, next) => {
  try {
    const { postId } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      throw { post: "Post not found", status: 404 };
    }
    const profile = await Profile.findById(req.auth.userId);
    if (!profile) {
      throw { profile: "Profile not found", status: 404 };
    }
    if (post.likes.includes(req.auth.userId)) {
      await post.updateOne({
        $pull: {
          likes: req.auth.userId,
        },
      });
    } else {
      await post.updateOne({
        $push: {
          likes: req.auth.userId,
        },
      });
    }
    res.status(204).send({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPosts,
  createPost,
  editPost,
  deletePost,
  toggleLike,
};
