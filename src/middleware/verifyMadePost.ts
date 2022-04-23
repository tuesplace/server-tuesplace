export default async (req, _, next) => {
  try {
    const { profile, post } = req;
    if (post.authorId !== profile.id) {
      throw { author: "Only the author can edit this post", status: 401 };
    }

    next();
  } catch (err) {
    next(err);
  }
};
