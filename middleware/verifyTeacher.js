const { RESTError, NotTeacher } = require("../errors");
const roles = require("../util/roles");

module.exports = async (req, _, next) => {
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
