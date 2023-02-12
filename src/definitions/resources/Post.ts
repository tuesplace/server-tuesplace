import { IPost, Resource } from "../../@types/tuesplace";
import { Post as PostModel } from "../../models";

export const Post: Resource<IPost> = {
  name: {
    eng: "Post",
    bg: "Пост",
  },
  lookupFieldLocation: "params.postId",
  documentLocation: "resources.post",
  by: "_id",
  model: PostModel,
};
