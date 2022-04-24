import { RESTError, PostNotFound } from "../errors";
import { GroupPosts } from "../models/Post";
import { Request } from "express";

export default async (req: Request, _: any, next: any) => {
  try {
    const { postId, groupId } = req.params;
    const post = await GroupPosts(`${groupId}`).findById(postId);
    if (!post) {
      throw new RESTError(PostNotFound, 404);
    }
    req.post = post;

    next();
  } catch (err) {
    next(err);
  }
};
