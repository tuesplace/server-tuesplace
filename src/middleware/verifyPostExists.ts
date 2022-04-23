import { RESTError, PostNotFound } from "../errors";
import { GroupPosts } from "../models/Post";

export default async (req, _, next) => {
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
