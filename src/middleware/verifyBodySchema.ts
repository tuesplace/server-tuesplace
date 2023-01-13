import { RequestBodyBlueprint } from "../@types/tuesplace";
import { NotConformToSchemaError, RESTError } from "../errors";
import { Request, Response } from "express";
import { ObjectBlueprint } from "../requestSchema";
import { RequestBody } from "../definitions";

export const verifyBodySchema =
  (schema: RequestBodyBlueprint) =>
  async (req: Request, _res: Response, next: any) => {
    try {
      const blueprint = new ObjectBlueprint(schema, RequestBody);

      const errors = await blueprint.assert(req.body);
      if (errors.length) {
        throw new RESTError(
          [NotConformToSchemaError(RequestBody, schema), ...errors],
          400
        );
      }
      next();
    } catch (err) {
      next(err);
    }
  };
