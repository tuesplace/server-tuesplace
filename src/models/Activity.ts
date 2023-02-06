import { model, Schema } from "mongoose";
import { IActivity } from "../@types/tuesplace";

const activitySchema = new Schema<IActivity>({
  day: Number,
  start: Number,
  end: Number,
  associations: {
    type: Object,
    required: true,
  },
});

export const Activity = model("Activity", activitySchema);
