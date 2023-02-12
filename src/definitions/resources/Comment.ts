import { IComment, Resource } from "../../@types/tuesplace";
import { Comment as CommentModel } from "../../models";

export const Comment: Resource<IComment> = {
  name: {
    eng: "Comment",
    bg: "Коментар",
  },
  lookupFieldLocation: "params.commentId",
  documentLocation: "resources.comment",
  by: "_id",
  model: CommentModel,
};
