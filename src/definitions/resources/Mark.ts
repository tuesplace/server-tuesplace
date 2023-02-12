import { IMark, Resource } from "../../@types/tuesplace";
import { Mark as MarkModel } from "../../models";

export const Mark: Resource<IMark> = {
  name: {
    eng: "Mark",
    bg: "Оценка",
  },
  lookupFieldLocation: "params.markId",
  documentLocation: "resources.mark",
  by: "_id",
  model: MarkModel,
};
