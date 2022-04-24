import roles from "../util/roles";
import { RESTError, GroupPermission } from "../errors";
import { Request } from "express";

export default async (req: Request, _: any, next: any) => {
  try {
    const { profile, group } = req;
    if (
      (profile.role === roles.teacher &&
        !group.teachers.includes(req.auth.userId)) ||
      (profile.role === roles.admin &&
        !group.admins.includes(req.auth.userId)) ||
      !group.allowedClasses.includes(profile.class)
    ) {
      throw new RESTError(GroupPermission, 401);
    }

    next();
  } catch (err) {
    next(err);
  }
};
