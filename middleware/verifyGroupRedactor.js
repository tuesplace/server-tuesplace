const Group = require("../models/Group");
const Profile = require("../models/Profile");
const roles = require("../util/roles");

module.exports = async (req, _, next) => {
  try {
    const { groupId } = req.params;
    const profile = await Profile.findById(req.auth.userId);
    if (profile.role !== roles.teacher && profile !== roles.admin) {
      throw { profile: "You are not a teacher", status: 401 };
    }
    const group = await Group.findById(groupId);
    if (!group) {
      throw { group: "Group not found", status: 404 };
    }
    if (!group.teachers.includes(req.auth.userId) && profile.role !== roles.admin) {
      throw { group: "You need to be admin or teacher to edit", status: 401 };
    }
    next();
  } catch (err) {
    next(err);
  }
};
