import { model, Schema } from "mongoose";
import { IProfile } from "../@types/tuesplace";

const profileSchema = new Schema<IProfile>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    class: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default model("Profile", profileSchema);
