const verifyToken = require("./verifyToken");
const verifyYoungToken = require("./verifyYoungToken");
const verifyGroupExists = require("./verifyGroupExists");
const verifyInGroup = require("./verifyInGroup");
const verifyGroupRedactor = require("./verifyGroupRedactor");
const verifyMadePost = require("./verifyMadePost");
const verifyPostExists = require("./verifyPostExists");
const verifyCommentExists = require("./verifyCommentExists");
const verifyMadeComment = require("./verifyMadeComment");
const verifyStudentExists = require("./verifyStudentExists");
const verifyStudentInGroup = require("./verifyStudentInGroup");
const errorHandler = require("./errorHandler");
const resSender = require("./resSender");

module.exports = {
  verifyToken,
  verifyYoungToken,
  verifyGroupExists,
  verifyInGroup,
  verifyGroupRedactor,
  verifyMadePost,
  verifyPostExists,
  verifyCommentExists,
  verifyMadeComment,
  verifyStudentExists,
  verifyStudentInGroup,
  errorHandler,
  resSender,
};
