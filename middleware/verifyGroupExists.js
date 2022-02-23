const Group = require("../models/Group");

module.exports = async (req, _, next) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) {
      throw { group: "group does not exist" };
    }
    req.group = group;

    next();
  } catch (err) {
    next(err);
  }
};
