import zod from "zod";
import { GroupType, GroupClasses, GroupName } from "../definitions";

export const createGroupSchema = zod.object({
  name: GroupName,
  type: GroupType,
  classes: GroupClasses,
});

export const editGroupSchema = createGroupSchema.partial();
