const { StudentMarks } = require("../models/Mark");

module.exports = async (req, _, next) => {
  try {
    const { markId } = req.params;
    const { group } = req;
    const mark = await StudentMarks(`${group._id.toString()}`).findById(markId);
    if (!mark) {
      throw { post: "Mark not found", status: 404 };
    }
    req.mark = mark;

    next();
  } catch (err) {
    next(err);
  }
};
