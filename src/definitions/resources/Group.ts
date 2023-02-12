import { IGroup, Resource } from "../../@types/tuesplace";
import { Group as GroupModel } from "../../models";

export const Group: Resource<IGroup> = {
  name: {
    eng: "Group",
    bg: "Група",
  },
  lookupFieldLocation: "params.groupId",
  documentLocation: "resources.group",
  by: "_id",
  model: GroupModel,
};
