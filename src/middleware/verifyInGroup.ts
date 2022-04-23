const roles = require("../util/roles");
import {RESTError, GroupPermission} from '../errors';

export default async (req, _, next) => {
  try {
    const { profile, group } = req;
    if (
      (profile.role === roles.teacher && !group.teachers.includes(req.auth.userId)) ||
      (profile.role === roles.admin && !group.admins.includes(req.auth.userId)) ||
      !group.allowedClasses.includes(profile.class)
    ) {
      throw new RESTError(GroupPermission, 401);
    }

    next();
  } catch (err) {
    next(err);
  }
};
