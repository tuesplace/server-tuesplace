import { Request } from "express";
export default async (req: Request, _: any, next: any) => {
  try {
    const { profile, post } = req;
    if (post.authorId !== profile.id) {
      throw { author: "Only the author can edit this post", status: 401 };
    }

    next();
  } catch (err) {
    next(err);
  }
};
