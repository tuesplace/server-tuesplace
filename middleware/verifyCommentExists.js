const { RESTError, CommentNotFound } = require("../errors");
const { PostComments } = require("../models/Post");

module.exports = async (req, _, next) => {
  try {
    const { postId, commentId } = req.params;
    const comment = await PostComments(`${postId}`).findById(commentId);
    if (!comment) {
      throw new RESTError(CommentNotFound, 404);
    }
    req.comment = comment;

    next();
  } catch (err) {
    next(err);
  }
};
