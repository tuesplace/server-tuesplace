import { model, Schema } from "mongoose";
import { IMark } from "../@types/tuesplace";

const markSchema = new Schema<IMark>(
  {
    owner: {
      type: Object,
      required: true,
    },
    mark: {
      type: Number,
      required: true,
    },
    associations: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

export const Mark = model("Mark", markSchema);
