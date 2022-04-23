const { RESTError } = require("../errors");
const Group = require("../models/Group");
const Profile = require("../models/Profile");
const roles = require("../util/roles");
const { validateGroup } = require("../util/validators");

const getGroup = async (req, res, next) => {
  try {
    const { group } = req;
    res.sendRes({ ...group._doc });
  } catch (err) {
    next(err);
  }
};

const createGroup = async (req, res, next) => {
  try {
    const { groupName, teachers, allowedClasses } = req.body;
    const { errors, valid } = validateGroup({ groupName, teachers, allowedClasses }, true);
    if (!valid) {
      throw new RESTError(errors, 400);
    }
    const group = await Group.create({
      groupName,
      teachers,
      allowedClasses,
    });
    res.sendRes(group);
  } catch (err) {
    next(err);
  }
};

const editGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { groupName, teachers, allowedClasses } = req.body;
    const { errors, valid } = validateGroup({ groupName, teachers, allowedClasses }, false);
    if (!valid) {
      throw { ...errors };
    }
    const group = await Group.findById(groupId);
    if (!group) {
      throw { group: "Group not found", status: 404 };
    }

    group.groupName = groupName || group.groupName;
    group.teachers = teachers || group.teachers;
    group.allowedClasses = allowedClasses || group.allowedClasses;
    await group.save();
    res.sendRes({ ...group._doc });
  } catch (err) {
    next(err);
  }
};

const deleteGroup = async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.auth.userId);
    if (!profile) {
      throw { profile: "Profile Not Found", status: 404 };
    }
    if (profile.role != roles.admin) {
      throw { profile: "Profile not admin", status: 401 };
    }
    const { groupId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) {
      throw { group: "Group not found", status: 404 };
    }
    await group.deleteOne();
    res.status(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getGroup,
  createGroup,
  editGroup,
  deleteGroup,
};
