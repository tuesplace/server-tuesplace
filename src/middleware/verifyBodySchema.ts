// import { NotConformToSchemaError, RESTError } from "../errors";
import { Request, Response } from "express";
// import { RequestBody } from "../definitions";
import { z } from "zod";
import lo from "lodash";
import { NotConformToSchemaError, RESTError } from "../errors";
import { RequestBody } from "../definitions";
import { renderTranslation } from "../util";
import capitalizeString from "../util/capitalizeString";

export const verifyBodySchema =
  (schema: z.Schema | ((context: Request) => z.Schema)) =>
  async (req: Request, _res: Response, next: any) => {
    try {
      const blueprint = lo.isFunction(schema) ? schema(req) : schema;

      const parseResult = await blueprint.safeParseAsync(req.body);
      if (!parseResult.success) {
        const typedErrors = parseResult.error.issues
          .filter((issue) => issue.code === "custom")
          .map((issue: any) => {
            const typedError = issue.params;
            return {
              ...typedError,
              message: issue.path[0]
                ? renderTranslation(typedError.message, {
                    name: {
                      eng: capitalizeString(issue.path[0].toString()),
                      bg: capitalizeString(issue.path[0].toString()),
                    },
                  })
                : typedError.message,
            };
          });
        if (!typedErrors.length) {
          throw new RESTError(NotConformToSchemaError(RequestBody), 400);
        }
        throw new RESTError(typedErrors, 400);
      }
      next();
    } catch (err) {
      next(err);
    }
  };
