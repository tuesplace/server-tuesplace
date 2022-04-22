const jwt = require("jsonwebtoken");
const { RedundantAccessToken, ProfileNotFound, TokenNotProvided } = require("../errors");
const RESTError = require("../errors/RESTError");
const Profile = require("../models/Profile");
const RefreshTokenFamily = require("../models/RefreshTokenFamily");

module.exports = async (req, _, next) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new RESTError(TokenNotProvided, 400);
    }
    const token = authHeader.split("Bearer ")[1].trim();

    req.auth = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const refreshTokenFamily = await RefreshTokenFamily.findById(req.auth.refreshTokenFamilyId);

    if (
      !refreshTokenFamily ||
      refreshTokenFamily.redundantTokens.includes(req.auth.refreshTokenId)
    ) {
      throw new RESTError(RedundantAccessToken, 404);
    }

    const profile = await Profile.findById(req.auth.userId);
    if (!profile) {
      throw new RESTError(ProfileNotFound, 404);
    }
    req.profile = profile;

    next();
  } catch (err) {
    next(err);
  }
};
