import { model, Schema, Types } from "mongoose";

const postSchema = new Schema(
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

const GroupPosts = (groupId) => model(`group${groupId}posts`, postSchema, `group${groupId}posts`);

const PostComments = (postId) =>
  model(`post${postId}comments`, postSchema, `post${postId}comments`);

export { GroupPosts, PostComments };
