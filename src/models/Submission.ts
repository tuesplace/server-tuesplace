import { model, Schema } from "mongoose";
import { ISubmission } from "../@types/tuesplace";

const submissionSchema = new Schema<ISubmission>(
  {
    owner: {
      type: Object,
      required: true,
    },
    associations: {
      type: Object,
      required: true,
    },
    assets: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

export const Submission = model("Submission", submissionSchema);
