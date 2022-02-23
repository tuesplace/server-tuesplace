module.exports = async (postComment, userId, emoji) => {
  if (!!postComment.reactions.filter((e) => e.authorId === userId && e.emoji == emoji).length) {
    await postComment.updateOne({
      $pull: {
        reactions: { authorId: req.auth.userId, emoji },
      },
    });
  } else {
    await postComment.updateOne({
      $push: {
        reactions: { authorId: req.auth.userId, emoji },
      },
    });
  }
};
