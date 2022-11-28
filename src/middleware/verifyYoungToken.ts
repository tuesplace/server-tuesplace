import { Request } from "express";
import { accessTokenSecret } from "../config";
import { RESTError, OldTokenError } from "../errors";
import { getToken } from "../util";

export const verifyYoungToken = async (req: Request, _: any, next: any) => {
  try {
    const token = getToken(req, accessTokenSecret);
    const utcMilllisecondsSinceEpoch = Date.now();
    const utcSecondsSinceEpoch = Math.round(utcMilllisecondsSinceEpoch / 1000);

    const tokenAgeInMinutes = (utcSecondsSinceEpoch - token.iat!) / 60;
    if (tokenAgeInMinutes > 20) {
      throw new RESTError(OldTokenError, 403);
    }
    next();
  } catch (err) {
    next(err);
  }
};
