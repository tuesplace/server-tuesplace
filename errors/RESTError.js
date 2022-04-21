const { isArray } = require("lodash");

class RESTError extends Error {
  constructor(errors, code) {
    super("");
    Error.captureStackTrace(this, RESTError);

    this.name = "RESTError";

    if (!isArray(errors)) {
      this.errors = new Array(errors);
    } else {
      this.errors = errors;
    }
    this.code = code;
  }
}

module.exports = RESTError;
