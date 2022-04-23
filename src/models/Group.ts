import { model, Schema } from "mongoose";

const groupSchema = new Schema(
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
