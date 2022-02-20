const { model, Schema } = require("mongoose");

const profileSchema = new Schema({
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
  profilePic: {
    type: String,
    default: "",
  },
  interests: Array,
  workPlace: String,
  cv: Object,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: "",
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Profile", profileSchema);
