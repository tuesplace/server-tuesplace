const verifyToken = require("./verifyToken");
const errorHandler = require("./errorHandler");
const verifyYoungToken = require("./verifyYoungToken");
const verifyInGroup = require("./verifyInGroup");
const verifyGroupRedactor = require("./verifyGroupRedactor");
const verifyMadePost = require("./verifyMadePost");

module.exports = {
  verifyToken,
  errorHandler,
  verifyYoungToken,
  verifyInGroup,
  verifyGroupRedactor,
  verifyMadePost,
};
