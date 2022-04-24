import bcrypt from "bcryptjs";
import "dotenv/config";

import jwt from "jsonwebtoken";

import Profile from "../models/Profile";

import { validateSignUp, validateSignIn } from "../util/validators";
import { createNewTokenPair, rotateTokenPair } from "../util/createTokenPair";

import RefreshTokenFamily from "../models/RefreshTokenFamily";
import RESTError from "../errors/RESTError";
import { WrongPassword, ProfileNotFound, EmailTaken } from "../errors";
import { Request, Response } from "express";

const signUp = async (req: Request, res: Response, next: any) => {
  try {
    const { fullName, email, password, passwordConfirm } = req.body;

    const { valid, errors } = validateSignUp(fullName, email, password, passwordConfirm);
    if (!valid) {
      throw { ...errors, status: 400 };
    }

    const emailTaken = await Profile.findOne({ email });

    if (emailTaken) {
      throw new RESTError(EmailTaken, 400);
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

    res.sendRes({
      accessToken,
      refreshToken,
      userId: result.id,
    });
  } catch (err) {
    next(err);
  }
};

const signIn = async (req: Request, res: Response, next: any) => {
  try {
    const { email, password } = req.body;

    const { errors, valid } = validateSignIn(email, password);
    if (!valid) {
      throw new RESTError(errors, 400);
    }

    const profile = await Profile.findOne({ email });
    if (!profile) {
      throw new RESTError(ProfileNotFound, 404);
    }

    if (!(await bcrypt.compare(password, profile.password))) {
      throw new RESTError(WrongPassword, 401);
    }

    const { accessToken, refreshToken } = await createNewTokenPair(profile.id);

    res.sendRes({ accessToken, refreshToken, userId: profile.id });
  } catch (err) {
    next(err);
  }
};

const generateAccessToken = async (req: Request, res: Response, next: any) => {
  try {
    const { userId, refreshTokenFamilyId, refreshTokenId } = jwt.verify(
      req.body.refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as jwt.JwtPayload;

    const profile = await Profile.findById(userId);
    if (!profile) {
      throw new RESTError(ProfileNotFound, 404);
    }

    const { accessToken, refreshToken } = await rotateTokenPair(
      refreshTokenId,
      refreshTokenFamilyId,
      userId
    );
    res.sendRes({ accessToken, refreshToken, id: userId });
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      const { refreshTokenFamilyId } = jwt.decode(req.body.refreshToken) as jwt.JwtPayload;
      await RefreshTokenFamily.findByIdAndDelete(refreshTokenFamilyId);
    }
    next(err);
  }
};

export { signIn, signUp, generateAccessToken };
