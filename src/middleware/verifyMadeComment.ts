import { RESTError, NotCommentAuthor } from "../errors";
import { Request } from "express";

export default async (req: Request, _: any, next: any) => {
  try {
    const { profile, comment } = req;
    if (comment.authorId !== profile.id) {
      throw new RESTError(NotCommentAuthor, 403);
    }

    next();
  } catch (err) {
    next(err);
  }
};
