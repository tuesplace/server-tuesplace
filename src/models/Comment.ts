import { model, Schema } from "mongoose";
import { IComment } from "../@types/tuesplace";

const commentSchema = new Schema<IComment>(
  {
    owner: {
      type: Object,
      required: true,
    },
    body: {
      type: String,
      default: "",
    },
    reactions: Array,
    assets: {
      type: Object,
      default: {},
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    associations: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

export const Comment = model("Comment", commentSchema);
