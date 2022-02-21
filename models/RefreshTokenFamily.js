const { model, Schema } = require("mongoose");

const refreshTokenFamilySchema = new Schema(
  {
    redundantTokens: Array,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    lastRefresh: {
      type: Date,
      default: Date.now,
    },
    userId: String,
  },
  { timestamps: true }
);

module.exports = model("RefreshTokenFamily", refreshTokenFamilySchema);
