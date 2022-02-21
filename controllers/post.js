const Profile = require("../models/Profile");
const { GroupPosts } = require("../models/Post");
const Group = require("../models/Group");
const { validatePost } = require("../util/validators");

const getPosts = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    let { page, limit } = req.query;
    if (!page) {
      page = 0;
    }
    if (!limit) {
      limit = 10;
    }
    page = parseInt(page);
    limit = parseInt(limit);
    if (page > 0) page -= 1;
    const group = await Group.findById(groupId);
    if (!group) {
      throw { group: "Group not found", status: 404 };
    }
    const groupPosts = await GroupPosts(groupId)
      .find({})
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit);
    res.send({ success: true, response: { groupPosts } });
  } catch (err) {
    next(err);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { body } = req.body;
    const { errors, valid } = validatePost({ body });
    if (!valid) {
      throw { ...errors, status: 400 };
    }

    const post = await GroupPosts(`${groupId}`).create({
      groupId,
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
    const { postId, groupId } = req.params;
    const { body } = req.body;
    const post = await GroupPosts(`${groupId}`).findById(postId);

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
    const { postId, groupId } = req.params;
    const post = await GroupPosts(`${groupId}`).findById(postId);
    await post.deleteOne();
    res.status(204).send({ success: true });
  } catch (err) {
    next(err);
  }
};

const toggleLike = async (req, res, next) => {
  try {
    const { postId, groupId } = req.params;
    const post = await GroupPosts(`${groupId}`).findById(postId);
    const group = await Group.findById(groupId);
    if (!post || !group) {
      throw { groupPost: "Group or post do not exist", status: 404 };
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
