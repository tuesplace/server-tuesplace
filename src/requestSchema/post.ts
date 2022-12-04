import { RequestBodyBlueprint } from "../@types/tuesplace";
import { AssignmentInfo, CommentBody, PostBody } from "../definitions";

export const createPostSchema: RequestBodyBlueprint = {
  body: CommentBody,
  assignmentInfo: AssignmentInfo,
};

export const editPostSchema: RequestBodyBlueprint = {
  body: PostBody,
};
