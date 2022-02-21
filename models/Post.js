const { model, Schema, Types } = require("mongoose");

const postSchema = new Schema(
  {
    authorId: {
      type: String,
      required: true,
    },
    groupId: {
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

const GroupPosts = (groupId) =>
  model(`postsOfGroup${groupId}`, postSchema, `postsOfGroup${groupId}`);

module.exports = { Post: model("Post", postSchema), GroupPosts };
