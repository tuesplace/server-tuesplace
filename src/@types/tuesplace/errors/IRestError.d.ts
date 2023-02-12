import { TypedError } from "./TypedError";

export interface IRESTError {
  code: number;
  errors: TypedError[];
}
