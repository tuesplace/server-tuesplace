import { sendAdminEmail } from "../util";
import { Request, Response } from "express";
import { CriticalError, RESTError } from "../errors";
import { TransformedError, TypedError } from "../@types/tuesplace";
import { environment } from "../config";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

export const transformError = (err: any, lang: string): TransformedError => ({
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

  if (environment === "DEV") {
    console.log(err.stack);
  }

  if (
    environment !== "DEV" &&
    (err instanceof CriticalError ||
      (!(err instanceof RESTError) && !(err instanceof JsonWebTokenError)))
  ) {
    await sendAdminEmail(
      { ...transformedError, stacktrace: err.stack },
      { reqId: req.id }
    );
  }

  res
    .status(
      err instanceof RESTError
        ? Number(err.code)
        : err instanceof TokenExpiredError
        ? 401
        : 500
    )
    .send(transformedError);
};
