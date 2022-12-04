import { model, Schema } from "mongoose";
import { IAsset } from "../@types/tuesplace";

const assetSchema = new Schema<IAsset>(
  {
    owner: {
      type: Object,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    meta: {
      type: Object,
      default: {},
    },
    src: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const Asset = model("Asset", assetSchema);
