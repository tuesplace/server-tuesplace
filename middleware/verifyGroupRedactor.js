const { RESTError, GroupRedactor } = require("../errors");
const roles = require("../util/roles");

module.exports = async (req, _, next) => {
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
