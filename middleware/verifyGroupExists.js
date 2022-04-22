const { GroupNotFound } = require("../errors");
const RESTError = require("../errors/RESTError");
const Group = require("../models/Group");

module.exports = async (req, _, next) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) {
      throw new RESTError(GroupNotFound, 404);
    }
    req.group = group;

    next();
  } catch (err) {
    next(err);
  }
};
