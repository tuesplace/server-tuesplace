import { Request } from "express";
import zod from "zod";
import { AssignmentInfo, CommentBody, PostBody, Teacher } from "../definitions";

export const createPostSchema = (context: Request) =>
  zod
    .object(
      context.profile!.role == Teacher.value
        ? {
            body: CommentBody,
            assignmentInfo: AssignmentInfo,
          }
        : { body: CommentBody }
    )
    .strict();

export const editPostSchema = zod
  .object({
    body: PostBody,
    assignmentInfo: AssignmentInfo,
  })
  .partial()
  .strict();
