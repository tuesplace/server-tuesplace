import { Request } from "express";
import { IReaction } from "../@types/tuesplace";

export default async (postComment: any, userId: string, emoji: string, req: Request) => {
  if (
    !!postComment.reactions.filter((e: IReaction) => e.authorId === userId && e.emoji == emoji)
      .length
  ) {
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
