module.exports = async (req, _, next) => {
  try {
    const { profile, comment } = req;
    if (comment.authorId !== profile.id) {
      throw { author: "Only the author can edit this comment", status: 401 };
    }

    next();
  } catch (err) {
    next(err);
  }
};
