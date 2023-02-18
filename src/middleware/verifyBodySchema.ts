import { Request, Response } from "express";
import { z } from "zod";
import lo from "lodash";
import { NotConformToSchemaError, RESTError } from "../errors";
import { RequestBody } from "../definitions";
import { parseZodError } from "../util/zod";

export const verifyBodySchema =
  (schema: z.Schema | ((context: Request) => z.Schema)) =>
  async (req: Request, _res: Response, next: any) => {
    try {
      const blueprint = lo.isFunction(schema) ? schema(req) : schema;

      const parseResult = await blueprint.safeParseAsync(req.body);
      if (!parseResult.success) {
        const typedErrors = parseZodError(parseResult);
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
