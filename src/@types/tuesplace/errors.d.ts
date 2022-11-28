import { Translation } from "./general";

export type TypedError = {
  type: string;
  message: Translation;
};

export interface IRESTError {
  code: number;
  errors: TypedError[];
}

export type TransformedError = {
  success: boolean;
  name: any;
  code?: number;
  errors?: TypedError[];
};
