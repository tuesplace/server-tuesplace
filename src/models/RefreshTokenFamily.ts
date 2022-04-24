import { model, Schema } from "mongoose";

const refreshTokenFamilySchema = new Schema(
  {
    redundantTokens: Array,
    lastRefresh: {
      type: Date,
      default: Date.now,
    },
    userId: String,
  },
  { timestamps: true }
);

export default model("RefreshTokenFamily", refreshTokenFamilySchema);
