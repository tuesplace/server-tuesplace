const { model, Schema } = require("mongoose");

const markSchema = new Schema(
  {
    teacherId: {
      type: String,
      required: true,
    },
    mark: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const StudentMarks = (groupId) => model(`group${groupId}marks`, markSchema, `group${groupId}marks`);

module.exports = { StudentMarks };
