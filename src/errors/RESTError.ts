import { isArray } from "lodash";

class RESTError extends Error {
  errors = [];
  code = "";
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

export default RESTError;
