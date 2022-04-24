import { model, Schema } from "mongoose";
import { IMark } from "../@types/tuesplace/IMark";

const markSchema = new Schema<IMark>(
  {
    teacherId: {
      type: String,
      required: true,
    },
    mark: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const StudentMarks = (groupId: string) =>
  model(`group${groupId}marks`, markSchema, `group${groupId}marks`);

export { StudentMarks };
