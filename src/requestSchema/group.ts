import { RequestBodyBlueprint } from "../@types/tuesplace";
import { StringField, GroupType, GroupClasses } from "../definitions";

export const createGroupSchema: RequestBodyBlueprint = {
  name: StringField({ eng: "Group Name", bg: "Име на Група" }),
  type: GroupType,
  classes: GroupClasses,
};
