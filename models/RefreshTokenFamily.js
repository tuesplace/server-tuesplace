const { model, Schema } = require("mongoose");

const refreshTokenFamilySchema = new Schema({
  redundantTokens: Array,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  lastRefresh: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("RefreshTokenFamily", refreshTokenFamilySchema);
