const Group = require("../models/Group");

module.exports = async (req, res, next) => {
  try {
    const { student, group } = req;
    if (!group.allowedClasses.includes(student.class)) {
      throw { student: "Student is not a part of this group", status: 400 };
    }

    next();
  } catch (err) {
    next(err);
  }
};
