const Profile = require("../models/Profile");
const roles = require("../util/roles");

module.exports = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const student = await Profile.findById(studentId);
    if (!student) {
      throw { student: "Student does not exist", status: 404 };
    }
    if (student.role !== roles.student) {
      throw { student: "Student is not a student", status: 404 };
    }
    req.student = student;
    next();
  } catch (err) {
    next(err);
  }
};
