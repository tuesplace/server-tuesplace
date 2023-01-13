import zod from "zod";
import { CommentBody, CommentIsPrivate } from "../definitions";

export const createComment = zod.object({
  body: CommentBody,
  isPrivate: CommentIsPrivate,
});

export const editCommentSchema = zod.object({
  body: CommentBody,
});
