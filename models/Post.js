const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  author: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  filters: Array,
  likes: {
    type: Number,
    default: 0,
  },
  comments: Object,
});

module.exports = model("Post", postSchema);
