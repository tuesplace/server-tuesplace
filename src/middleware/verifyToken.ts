import jwt from "jsonwebtoken";
import {
  RedundantAccessToken,
  ProfileNotFound,
  TokenNotProvided,
} from "../errors/index";
import RESTError from "../errors/RESTError";
import Profile from "../models/Profile";
import RefreshTokenFamily from "../models/RefreshTokenFamily";
import { Request } from "express";

export default async (req: Request, _: any, next: any) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new RESTError(TokenNotProvided, 400);
    }
    const token = authHeader.split("Bearer ")[1].trim();

    req.auth = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

    const refreshTokenFamily = await RefreshTokenFamily.findById(
      req.auth.refreshTokenFamilyId
    );

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
