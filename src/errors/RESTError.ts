import { isArray } from "lodash";

interface Error {
  type: string;
  message: string;
}
class RESTError extends Error {
  errors = Array<Error>();
  code = "";
  constructor(errors: Error | Array<Error>, code: string | number) {
    super("");
    Error.captureStackTrace(this, RESTError);

    this.name = "RESTError";

    if (!isArray(errors)) {
      this.errors = new Array<Error>(errors);
    } else {
      this.errors = errors;
    }
    this.code = code.toString();
  }
}

export default RESTError;
