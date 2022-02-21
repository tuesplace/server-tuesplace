const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv/config");
const RefreshTokenFamily = require("../models/RefreshTokenFamily");

const createNewTokenPair = async (userId) => {
  await RefreshTokenFamily.findOneAndDelete({ userId });
  const refreshTokenFamilyId = mongoose.Types.ObjectId();
  const refreshTokenId = mongoose.Types.ObjectId();
  const refreshToken = jwt.sign(
    {
      refreshTokenFamilyId,
      refreshTokenId,
      userId,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  await RefreshTokenFamily.create({
    _id: refreshTokenFamilyId,
    userId,
  });

  const accessToken = jwt.sign(
    {
      userId,
      refreshTokenFamilyId,
      refreshTokenId,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "40m" }
  );

  return {
    accessToken,
    refreshToken,
  };
};

const rotateTokenPair = async (refreshTokenId, refreshTokenFamilyId, userId) => {
  const refreshTokenFamily = await RefreshTokenFamily.findById(refreshTokenFamilyId);
  if (!refreshTokenFamily) {
    throw { tokenPair: "Refresh Token does not exist", status: 401 };
  }
  if (refreshTokenFamily.redundantTokens.includes(refreshTokenId)) {
    refreshTokenFamily.deleteOne();
    throw { tokenPair: "Refresh Token Redundant", status: 401 };
  }

  refreshTokenFamily.redundantTokens.push(refreshTokenId);
  refreshTokenFamily.lastRefresh = Date.now();
  const newRefreshTokenId = mongoose.Types.ObjectId();
  const refreshToken = jwt.sign(
    {
      refreshTokenFamilyId,
      refreshTokenId: newRefreshTokenId,
      userId,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  const accessToken = jwt.sign(
    {
      refreshTokenFamilyId,
      refreshTokenId: newRefreshTokenId,
      userId,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "40m" }
  );

  await refreshTokenFamily.save();
  return {
    refreshToken,
    accessToken,
  };
};

module.exports = {
  createNewTokenPair,
  rotateTokenPair,
};
