import { Request } from "express";
import { get } from "lodash";
import { Resource } from "../@types/tuesplace";
import { NotFoundError, RESTError } from "../errors";

export const resolveResourceLookupLocation = <T>(
  resource: Resource<T>,
  context: Request
) => {
  const resolvedLocation = get(context, resource.lookupFieldLocation);
  if (!resolvedLocation) {
    throw new RESTError(NotFoundError(resource), 404);
  }

  return resolvedLocation;
};
