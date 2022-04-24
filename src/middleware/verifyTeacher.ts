import { RESTError, NotTeacher } from "../errors";
import roles from "../util/roles";
import { Request } from "express";

export default async (req: Request, _: any, next: any) => {
  try {
    const { profile } = req;
    if (profile.role !== roles.teacher) {
      throw new RESTError(NotTeacher, 403);
    }

    next();
  } catch (err) {
    next(err);
  }
};
