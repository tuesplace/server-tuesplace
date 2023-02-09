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
    verifications: {
      type: Object,
      default: {
        email: false,
      },
    },
    class: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      required: true,
    },
    assets: {
      type: Object,
      default: {},
    },
    deviceTokens: {
      type: [],
    },
  },
  { timestamps: true }
);

export const Profile = model("Profile", profileSchema);
