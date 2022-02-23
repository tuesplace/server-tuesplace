const verifyToken = require("./verifyToken");
const errorHandler = require("./errorHandler");
const verifyYoungToken = require("./verifyYoungToken");
const verifyGroupExists = require("./verifyGroupExists");
const verifyInGroup = require("./verifyInGroup");
const verifyGroupRedactor = require("./verifyGroupRedactor");
const verifyMadePost = require("./verifyMadePost");
const verifyPostExists = require("./verifyPostExists");
const verifyCommentExists = require("./verifyCommentExists");
const verifyMadeComment = require("./verifyMadeComment");

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
  errorHandler,
};
