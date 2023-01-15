import zod from "zod";
import { AssignmentInfo, CommentBody, PostBody } from "../definitions";

export const createPostSchema = zod
  .object({
    body: CommentBody,
    assignmentInfo: AssignmentInfo,
  })
  .strict();

export const editPostSchema = zod
  .object({
    body: PostBody,
  })
  .strict();
