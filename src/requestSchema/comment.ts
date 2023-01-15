import zod from "zod";
import { CommentBody, CommentIsPrivate } from "../definitions";

export const createComment = zod
  .object({
    body: CommentBody,
    isPrivate: CommentIsPrivate,
  })
  .strict();

export const editCommentSchema = zod
  .object({
    body: CommentBody,
  })
  .strict();
