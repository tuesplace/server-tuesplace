import { model, Schema } from "mongoose";
import { IRefreshTokenFamily } from "../@types/tuesplace";

const refreshTokenFamilySchema = new Schema<IRefreshTokenFamily>(
  {
    redundantTokens: Array,
    lastRefresh: {
      type: Number,
      default: Date.now,
    },
    userId: String,
  },
  { timestamps: true }
);

export default model("RefreshTokenFamily", refreshTokenFamilySchema);
