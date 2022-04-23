import { RESTError, GroupRedactor } from "../errors";
import roles from "../util/roles";

export default async (req, _, next) => {
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
