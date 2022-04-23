import { PostComments } from "../models/Post";
import { validateComment } from "../util/validators";
import reactToPostComment from "../util/reactToPostComment";
import { RESTError } from "../errors";

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
    const comments = await PostComments(postId)
      .find({})
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit);
    res.sendRes(comments);
  } catch (err) {
    next(err);
  }
};

const createComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { body } = req.body;
    const { errors, valid } = validateComment({ body });
    if (!valid) {
      throw new RESTError(errors, 400);
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

    const { errors, valid } = validateComment({ body });
    if (!valid) {
      throw new RESTError(errors, 400);
    }

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

    await reactToPostComment(comment, req.auth.userId, emoji, req);

    res.status(204).sendRes();
  } catch (err) {
    next(err);
  }
};

export { getComments, createComment, editComment, deleteComment, reactToComment };
