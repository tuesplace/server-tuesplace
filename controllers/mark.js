const { StudentMarks } = require("../models/Mark");
const Profile = require("../models/Profile");
const { validateMark } = require("../util/validators");

const getMarks = async (req, res, next) => {
  try {
    const { group } = req;
    const marks = await StudentMarks(group._id.toString()).find({});
    res.sendRes(marks);
  } catch (err) {
    next(err);
  }
};

const getStudentMarks = async (req, res, next) => {
  try {
    const { group, student } = req;
    const studentMarks = await StudentMarks(group._id.toString()).find({
      studentId: student._id.toString(),
    });
    res.sendRes(studentMarks);
  } catch (err) {
    next(err);
  }
};

const addMark = async (req, res, next) => {
  try {
    const { group, student } = req;
    const { mark } = req.body;
    const { errors, valid } = validateMark(mark);
    if (!valid) {
      throw { ...errors, status: 400 };
    }
    await StudentMarks(group._id.toString()).create({
      teacherId: req.auth.userId,
      studentId: student._id.toString(),
      mark,
    });
    res.status(204).sendRes();
  } catch (err) {
    next(err);
  }
};

const editMark = async (req, res, next) => {
  try {
    const { mark } = req;
    const { mark: newMark } = req.body;
    const { errors, valid } = validateMark(newMark);
    if (!valid) {
      throw { ...errors, status: 400 };
    }
    await mark.updateOne({
      mark: newMark,
    });
    res.status(204).sendRes();
  } catch (err) {
    next(err);
  }
};

const deleteMark = async (req, res, next) => {
  try {
    const { mark } = req;
    await mark.deleteOne();
    res.status(204).sendRes();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMarks,
  getStudentMarks,
  addMark,
  editMark,
  deleteMark,
};
