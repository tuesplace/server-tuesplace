const bcrypt = require("bcryptjs");
require("dotenv/config");

const jwt = require("jsonwebtoken");

const Profile = require("../models/Profile");

const { validateSignUp, validateSignIn } = require("../util/validators");
const { createNewTokenPair, rotateTokenPair } = require("../util/createTokenPair");

const RefreshTokenFamily = require("../models/RefreshTokenFamily");

const signUp = async (req, res, next) => {
  try {
    const { fullName, email, password, passwordConfirm } = req.body;

    const { valid, errors } = validateSignUp(fullName, email, password, passwordConfirm);
    if (!valid) {
      throw { ...errors, status: 400 };
    }

    const emailTaken = await Profile.findOne({ email });

    if (emailTaken) {
      throw { email: "Имейлът се използва от друг профил", status: 400 };
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new Profile({
      fullName,
      email,
      password: hashedPassword,
      emailVerified: false,
    });

    const result = await newUser.save();

    const { accessToken, refreshToken } = await createNewTokenPair(result.id);

    res.send({
      success: true,
      response: {
        accessToken,
        refreshToken,
        userId: result.id,
      },
    });
  } catch (err) {
    next(err);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { errors, valid } = validateSignIn(email, password);
    if (!valid) {
      throw { ...errors, status: 400 };
    }

    const profile = await Profile.findOne({ email });
    if (!profile) {
      throw { general: "Не съществува такъв акаунт", status: 404 };
    }

    if (!(await bcrypt.compare(password, profile.password))) {
      throw { password: "Грешна парола", status: 401 };
    }

    const { accessToken, refreshToken } = await createNewTokenPair(profile.id);

    res.send({
      success: true,
      response: { accessToken, refreshToken, userId: profile.id },
    });
  } catch (err) {
    next(err);
  }
};

const generateAccessToken = async (req, res, next) => {
  try {
    const { userId, refreshTokenFamilyId, refreshTokenId } = jwt.verify(
      req.body.refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const userProfile = await User.findById(userId);
    if (!userProfile) {
      throw { user: "User not found", status: 404 };
    }

    const { accessToken, refreshToken } = await rotateTokenPair(
      refreshTokenId,
      refreshTokenFamilyId,
      userId
    );
    res.send({
      success: true,
      response: { accessToken, refreshToken, id: userId },
    });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      const { refreshTokenFamilyId } = jwt.decode(req.body.refreshToken);
      await RefreshTokenFamily.findByIdAndDelete(refreshTokenFamilyId);
    }
    next(err);
  }
};

module.exports = {
  signIn,
  signUp,
  generateAccessToken,
};
