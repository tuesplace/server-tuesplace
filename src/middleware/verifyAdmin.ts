import { RESTError, NotAdmin } from "../errors";
import roles from "../util/roles";

export default async (req, _, next) => {
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
