import { Request } from "express";
import { NotPostAuthor, RESTError } from "../errors";
export default async (req: Request, _: any, next: any) => {
  try {
    const { profile, post } = req;
    if (post.authorId !== profile.id) {
      throw new RESTError(NotPostAuthor, 403);
    }

    next();
  } catch (err) {
    next(err);
  }
};
