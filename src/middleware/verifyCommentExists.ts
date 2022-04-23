import { RESTError, CommentNotFound } from "../errors";
import { PostComments } from "../models/Post";

export default async (req, _, next) => {
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
