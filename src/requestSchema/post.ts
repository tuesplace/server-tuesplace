import { RequestBodyBlueprint } from "../@types/tuesplace";
import { AssignmentInfo, CommentBody, MarkField } from "../definitions";

export const createPostSchema: RequestBodyBlueprint = {
  body: CommentBody,
  assignmentInfo: AssignmentInfo,
};

export const editPostSchema: RequestBodyBlueprint = {
  mark: MarkField,
};
