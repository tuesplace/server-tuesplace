import { Request } from "express";
import zod from "zod";
import { AssignmentInfo, PostBody, PostTitle, Teacher } from "../definitions";

export const createPostSchema = (context: Request) =>
  zod
    .object(
      context.profile!.role == Teacher.value
        ? {
            title: PostTitle,
            body: PostBody,
            assignmentInfo: AssignmentInfo,
          }
        : {
            title: PostTitle,
            body: PostBody,
          }
    )
    .strict();

export const editPostSchema = zod
  .object({
    title: PostTitle,
    body: PostBody,
    assignmentInfo: AssignmentInfo,
  })
  .partial()
  .strict();
