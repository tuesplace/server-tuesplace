const { model, Schema } = require("mongoose");

const profileSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    class: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = model("Profile", profileSchema);
