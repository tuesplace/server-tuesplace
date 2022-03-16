const { StudentMarks } = require("../models/Mark");
const { validateMark } = require("../util/validators");

const getMarks = async (req, res, next) => {
  try {
    const { group, student } = req;
    const studentMarks = await StudentMarks(group._id.toString(), student._id.toString()).find({});
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
    await StudentMarks(group._id.toString(), student._id.toString()).create({
      teacherId: req.auth.userId,
      mark,
    });
    res.status(204).sendRes();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMarks,
  addMark,
};
