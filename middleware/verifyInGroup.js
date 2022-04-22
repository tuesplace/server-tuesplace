const roles = require("../util/roles");

module.exports = async (req, _, next) => {
  try {
    const { profile, group } = req;
    if (
      !group.allowedClasses.includes(profile.class) &&
      !group.teachers.includes(req.auth.userId) &&
      profile.role !== roles.admin
    ) {
      throw new RESTError(GroupPermission, 401);
    }

    next();
  } catch (err) {
    next(err);
  }
};
