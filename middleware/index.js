const verifyToken = require("./verifyToken");
const verifyYoungToken = require("./verifyYoungToken");
const verifyGroupExists = require("./verifyGroupExists");
const verifyInGroup = require("./verifyInGroup");
const verifyGroupRedactor = require("./verifyGroupRedactor");
const verifyAdmin = require("./verifyAdmin");
const verifyTeacher = require("./verifyTeacher");
const verifyMadePost = require("./verifyMadePost");
const verifyPostExists = require("./verifyPostExists");
const verifyCommentExists = require("./verifyCommentExists");
const verifyMadeComment = require("./verifyMadeComment");
const verifyStudentExists = require("./verifyStudentExists");
const verifyStudentInGroup = require("./verifyStudentInGroup");
const verifyMarkExists = require("./verifyMarkExists");
const errorHandler = require("./errorHandler");
const resSender = require("./resSender");

module.exports = {
  verifyToken,
  verifyYoungToken,
  verifyGroupExists,
  verifyInGroup,
  verifyGroupRedactor,
  verifyAdmin,
  verifyTeacher,
  verifyMadePost,
  verifyPostExists,
  verifyCommentExists,
  verifyMadeComment,
  verifyStudentExists,
  verifyStudentInGroup,
  verifyMarkExists,
  errorHandler,
  resSender,
};
