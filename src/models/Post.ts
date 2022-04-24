import { model, Schema } from "mongoose";
import { IPostComment } from "../@types/tuesplace";

const postSchema = new Schema<IPostComment>(
  {
    authorId: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      default: "",
    },
    reactions: Array,
  },
  { timestamps: true }
);

const GroupPosts = (groupId: string) =>
  model(`group${groupId}posts`, postSchema, `group${groupId}posts`);

const PostComments = (postId: string) =>
  model(`post${postId}comments`, postSchema, `post${postId}comments`);

export { GroupPosts, PostComments };
