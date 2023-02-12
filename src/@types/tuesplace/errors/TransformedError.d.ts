import { TypedError } from "./TypedError";

export type TransformedError = {
  success: boolean;
  name: any;
  code?: number;
  errors?: TypedError[];
};
