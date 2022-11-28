import { model, Schema } from "mongoose";
import { IRefreshTokenGroup } from "../@types/tuesplace";

const refreshTokenGroupSchema = new Schema<IRefreshTokenGroup>(
  {
    usedRefreshTokens: Array,
    owner: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

export const RefreshTokenGroup = model(
  "RefreshTokenGroup",
  refreshTokenGroupSchema
);
