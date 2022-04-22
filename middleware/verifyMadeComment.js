const { RESTError, NotCommentAuthor } = require("../errors");

module.exports = async (req, _, next) => {
  try {
    const { profile, comment } = req;
    if (comment.authorId !== profile.id) {
      throw new RESTError(NotCommentAuthor, 403);
    }

    next();
  } catch (err) {
    next(err);
  }
};
