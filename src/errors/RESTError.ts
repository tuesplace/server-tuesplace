import { isArray } from "lodash";
import { IRESTError, TypedError } from "../@types/tuesplace";

export class RESTError extends Error implements IRESTError {
  errors = Array<TypedError>();
  code = 0;
  constructor(errors: TypedError | Array<TypedError>, code: number) {
    super("");
    Error.captureStackTrace(this, RESTError);

    this.name = "RESTError";

    if (!isArray(errors)) {
      this.errors = new Array<TypedError>(errors);
    } else {
      this.errors = errors;
    }
    this.code = code;
  }
}
