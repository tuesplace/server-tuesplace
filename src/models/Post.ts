import { model, Schema } from "mongoose";
import { IPost } from "../@types/tuesplace";

const postSchema = new Schema<IPost>(
  {
    owner: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
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
    assignmentInfo: {
      type: Object,
      default: {
        isAssignment: false,
        deadline: null,
      },
    },
    associations: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

export const Post = model("Post", postSchema);
