const Profile = require("../models/Profile");
const { GroupPosts } = require("../models/Post");

module.exports = async (req, _, next) => {
  try {
    const { postId, groupId } = req.params;
    const profile = await Profile.findById(req.auth.userId);
    if (!profile) {
      throw { profile: "Profile not found", status: 404 };
    }
    const post = await GroupPosts(`${groupId}`).findById(postId);
    if (!post) {
      throw { post: "Post not found", status: 404 };
    }
    if (post.authorId !== profile.id) {
      throw { author: "Only the author can edit this post", status: 401 };
    }

    next();
  } catch (err) {
    next(err);
  }
};
