import { sendAdminEmail } from "../util";
import { Request, Response } from "express";
import { CriticalError, RESTError } from "../errors";
import { TransformedError, TypedError } from "../@types/tuesplace";

const transformError = (err: any, lang: string): TransformedError => ({
  success: false,
  name: !(err instanceof RESTError) ? err.name : undefined,
  code: err instanceof RESTError ? err.code : undefined,
  errors:
    err instanceof RESTError
      ? err.errors.map((error: TypedError) => ({
          ...error,
          message: error.message[lang],
        }))
      : [{ type: err.name, message: err.message }],
});

export const errorHandler = async (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: any
) => {
  const transformedError = transformError(err, req.language);

  if (err instanceof CriticalError || !(err instanceof RESTError)) {
    await sendAdminEmail(
      { ...transformedError, stacktrace: err.stack },
      req.id
    );
  }

  res.sendRes(
    transformedError,
    err instanceof RESTError ? Number(err.code) : 500
  );
};
