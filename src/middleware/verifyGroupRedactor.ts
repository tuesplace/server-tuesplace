import { RESTError, GroupRedactor } from "../errors";
import roles from "../util/roles";
import { Request } from "express";

export default async (req: Request, _: any, next: any) => {
  try {
    const { profile } = req;
    if (profile.role !== roles.teacher && profile.role !== roles.admin) {
      throw new RESTError(GroupRedactor, 403);
    }

    next();
  } catch (err) {
    next(err);
  }
};
