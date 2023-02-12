import { IActivity, Resource } from "../../@types/tuesplace";
import { Activity as ActivityModel } from "../../models";

export const Activity: Resource<IActivity> = {
  name: {
    eng: "Activity",
    bg: "Дейност",
  },
  lookupFieldLocation: "params.activityId",
  documentLocation: "resources.activity",
  by: "_id",
  model: ActivityModel,
};
