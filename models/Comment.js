const { model, Schema } = require("mongoose");

const commentSchema = new Schema(
  {
    authorId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      default: "",
    },
    likes: Array,
  },
  { timestamps: true }
);

const GroupPosts = (postId) =>
  model(`commentsOfPost${postId}`, commentSchema, `commentsOfPost${postId}`);

module.exports = GroupPosts;
