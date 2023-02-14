import { Request } from "express";
import { NotFoundError, RESTError } from "../errors";
import { Profile } from "../models";
import { Profile as ProfileResource } from "../definitions/resources";
import { verifyAccessToken as verifyAccessTokenUtil } from "../util";

export const verifyAccessToken = async (req: Request, _: any, next: any) => {
  try {
    const userId = await verifyAccessTokenUtil(req.headers.authorization);
    const profile = await Profile.findById(userId);
    if (!profile) {
      throw new RESTError(NotFoundError(ProfileResource), 404);
    }

    req.profile = profile;

    next();
  } catch (err) {
    next(err);
  }
};
