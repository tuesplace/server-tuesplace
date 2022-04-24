import { RESTError, NotAdmin } from "../errors";
import roles from "../util/roles";
import { Request } from "express";

export default async (req: Request, _: any, next: any) => {
  try {
    const { profile } = req;
    if (profile.role !== roles.admin) {
      throw new RESTError(NotAdmin, 403);
    }

    next();
  } catch (err) {
    next(err);
  }
};
