import RefreshTokenFamily from "../models/RefreshTokenFamily";
import { Request } from "express";
import { OldRefreshToken, RESTError } from "../errors";

export default async (req: Request, _: unknown, next: any) => {
  try {
    const refreshTokenFamily = await RefreshTokenFamily.findById(
      req.auth.refreshTokenFamilyId
    );
    const utcMilllisecondsSinceEpoch = Date.now();
    const utcSecondsSinceEpoch = Math.round(utcMilllisecondsSinceEpoch / 1000);

    const tokenAgeInMinutes =
      (utcSecondsSinceEpoch - Date.parse(refreshTokenFamily.createdAt) / 1000) /
      60;
    if (tokenAgeInMinutes > 20) {
      refreshTokenFamily.deleteOne();
      throw new RESTError(OldRefreshToken, 401);
    }
    next();
  } catch (err) {
    next(err);
  }
};
