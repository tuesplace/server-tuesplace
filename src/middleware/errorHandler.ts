import sendAdminEmail from "../util/sendAdminEmail";
import { Request, Response } from "express";
import { RESTError } from "../errors";

const transformError = (err: unknown) => {
  return {
    success: false,
    name: err instanceof Error ? err.name : undefined,
    code: err instanceof RESTError ? err.code : undefined,
    errors:
      err instanceof RESTError
        ? err.errors || { type: err.name, message: err.message }
        : undefined,
    controller:
      err instanceof RESTError
        ? err.name == "RESTError"
          ? err.message
          : undefined
        : undefined,
  };
};

export default (err: Request, _: any, res: Response) => {
  if (err instanceof Error) {
    sendAdminEmail(err);
  }

  res
    .status(err instanceof RESTError ? Number(err.code) : 500)
    .send(transformError(err));
};
