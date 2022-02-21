const { model, Schema } = require("mongoose");

const groupSchema = new Schema(
  {
    groupName: {
      type: String,
      default: "",
    },
    isChat: {
      type: Boolean,
      default: false,
    },
    allowedClasses: Array,
    teachers: Array,
  },
  { timestamps: true }
);

module.exports = model("Group", groupSchema);
