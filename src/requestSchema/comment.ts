import { RequestBodyBlueprint } from "../@types/tuesplace";
import { CommentBody, CommentIsPrivate } from "../definitions";

export const createComment: RequestBodyBlueprint = {
  body: CommentBody,
  isPrivate: CommentIsPrivate,
};

export const editCommentSchema: RequestBodyBlueprint = {
  body: CommentBody,
};
