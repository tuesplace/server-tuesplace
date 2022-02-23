const { model, Schema, Types } = require("mongoose");

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

const GroupPosts = (groupId) =>
  model(`postsOfGroup${groupId}`, postSchema, `postsOfGroup${groupId}`);

const PostComments = (postId) =>
  model(`commentsOfPost${postId}`, commentSchema, `commentsOfPost${postId}`);

module.exports = { GroupPosts, PostComments };
