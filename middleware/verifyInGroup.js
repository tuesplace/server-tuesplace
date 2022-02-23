const roles = require("../util/roles");

module.exports = async (req, _, next) => {
  try {
    const { profile, group } = req;
    if (
      !group.allowedClasses.includes(profile.class) &&
      !group.teachers.includes(req.auth.userId) &&
      profile.role !== roles.admin
    ) {
      throw { group: "You cannot post in this group", status: 401 };
    }

    next();
  } catch (err) {
    next(err);
  }
};
