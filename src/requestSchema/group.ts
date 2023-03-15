import zod from "zod";
import { GroupType, Classes, GroupName } from "../definitions";

export const createGroupSchema = zod
  .object({
    name: GroupName,
    type: GroupType,
    classes: Classes,
  })
  .strict();

export const editGroupSchema = createGroupSchema.partial().strict();
