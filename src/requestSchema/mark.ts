import { RequestBodyBlueprint } from "../@types/tuesplace";
import { MarkField } from "../definitions";

export const createMarkSchema: RequestBodyBlueprint = {
  mark: MarkField,
};

export const editMarkSchema: RequestBodyBlueprint = {
  mark: MarkField,
};
