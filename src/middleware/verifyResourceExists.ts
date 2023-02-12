import { Request } from "express";
import { NotFoundError, RESTError, NoQueryError } from "../errors";
import { resolveResourceLookupLocation } from "../util";
import { Resource, FindResourceOptions } from "../@types/tuesplace";
import lo from "lodash";

export const verifyResourceExists =
  <T>(resource: Resource<T>, options?: FindResourceOptions) =>
  async (req: Request, _: any, next: any) => {
    try {
      const resolvedLocation = resolveResourceLookupLocation(resource, req);
      const resolvedQuery = { [resource.by]: resolvedLocation };
      if (!resolvedLocation || !Object.keys(resolvedQuery).length) {
        throw new RESTError(NoQueryError(resource), 500);
      }

      const document = await resource.model.findOne({
        ...resolvedQuery,
        ...(options?.resolveAttrs?.(req) || {}),
      } as object);
      if (!document) {
        throw new RESTError(NotFoundError(resource), 404);
      }

      lo.set(req, resource.documentLocation, document);

      next();
    } catch (err) {
      next(err);
    }
  };
