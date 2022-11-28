import { model, Schema } from "mongoose";
import { IGroup } from "../@types/tuesplace";

const groupSchema = new Schema<IGroup>(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    classes: Array,
    owners: Array,
    assets: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

export const Group = model<IGroup>("Group", groupSchema);
