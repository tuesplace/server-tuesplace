import { RESTError, CommentNotFound } from "../errors";
import { PostComments } from "../models/Post";
import { Request } from "express";

export default async (req: Request, _: any, next: any) => {
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
