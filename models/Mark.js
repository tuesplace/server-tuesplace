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
  },
  { timestamps: true }
);

const StudentMarks = (groupId, studentId) =>
  model(
    `group${groupId}student${studentId}marks`,
    markSchema,
    `group${groupId}student${studentId}marks`
  );

module.exports = { StudentMarks };
