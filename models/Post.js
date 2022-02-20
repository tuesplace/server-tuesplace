const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  authorId: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    default: "",
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("Post", postSchema);
