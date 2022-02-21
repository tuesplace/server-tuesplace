const Group = require("../models/Group");
const Profile = require("../models/Profile");
const roles = require("../util/roles");

module.exports = async (req, _, next) => {
  try {
    const profile = await Profile.findById(req.auth.userId);
    if (!profile) {
      throw { profile: "Profile does not exist" };
    }
    const { groupId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) {
      throw { group: "Group not found", status: 404 };
    }
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
