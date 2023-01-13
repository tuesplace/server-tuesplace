import zod from "zod";
import { AssignmentInfo, CommentBody, PostBody } from "../definitions";

export const createPostSchema = zod.object({
  body: CommentBody,
  assignmentInfo: AssignmentInfo,
});

export const editPostSchema = zod.object({
  body: PostBody,
});
