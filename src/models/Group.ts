import { model, Schema } from "mongoose";
import { IGroup } from "../@types/tuesplace";

const groupSchema = new Schema<IGroup>(
  {
    groupName: {
      type: String,
      default: "",
    },
    isChat: {
      type: Boolean,
      default: false,
    },
    allowedClasses: Array,
    teachers: Array,
    admins: Array,
  },
  { timestamps: true }
);

export default model("Group", groupSchema);
