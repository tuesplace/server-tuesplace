const { RESTError, PostNotFound } = require("../errors");
const { GroupPosts } = require("../models/Post");

module.exports = async (req, _, next) => {
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
