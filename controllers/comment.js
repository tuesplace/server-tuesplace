const { PostComments } = require("../models/Post");
const { validatePost } = require("../util/validators");
const reactToPostComment = require("../util/reactToPostComment");

const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
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
    const postComments = await PostComments(postId)
      .find({})
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit);
    res.sendRes(postComments);
  } catch (err) {
    next(err);
  }
};

const createComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { body } = req.body;
    const { errors, valid } = validatePost({ body });
    if (!valid) {
      throw { ...errors, status: 400 };
    }

    const comment = await PostComments(postId).create({
      authorId: req.auth.userId,
      body,
    });
    res.sendRes({ ...comment._doc });
  } catch (err) {
    next(err);
  }
};

const editComment = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const { body } = req.body;
    const comment = await PostComments(postId).findById(commentId);

    const { errors, valid } = validatePost({ body });
    if (!valid) {
      throw { ...errors, status: 400 };
    }

    comment.body = body || "";
    await comment.save();
    res.sendRes({ ...comment._doc });
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const comment = await PostComments(postId).findById(commentId);
    await comment.deleteOne();
    res.status(204).sendRes();
  } catch (err) {
    next(err);
  }
};

const reactToComment = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const { emoji } = req.body;
    const comment = await PostComments(`${postId}`).findById(commentId);

    await reactToPostComment(comment, req.auth.userId, emoji);

    res.status(204).sendRes();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getComments,
  createComment,
  editComment,
  deleteComment,
  reactToComment,
};
