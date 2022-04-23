import { RESTError, NotTeacher } from "../errors";
import roles from "../util/roles";

export default async (req, _, next) => {
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
