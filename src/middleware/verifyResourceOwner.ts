import { Request, Response } from "express";
import lo from "lodash";
import {
  Association,
  IDocument,
  Owned,
  OwnedByMany,
  Resource,
} from "../@types/tuesplace";
import { RESTError, NotOwnerError, CriticalError } from "../errors";

export const verifyResourceOwner =
  (owner: Resource<any>, resource: Resource<any>) =>
  async (req: Request, _res: Response, next: any) => {
    try {
      const document = lo.get(req, resource.documentLocation) as IDocument<
        Owned & OwnedByMany
      >;
      const ownerDoc = lo.get(
        req,
        owner.documentLocation
      ) as IDocument<unknown>;
      if (!ownerDoc?._id?.toString()) {
        throw new CriticalError();
      }
      if (
        (!document.owner && !document.owners) ||
        (document.owner &&
          document.owner._id.toString() !== ownerDoc._id.toString()) ||
        (document.owners &&
          !document.owners.filter(
            (owner: Association) =>
              owner._id?.toString() === ownerDoc._id.toString()
          ).length)
      ) {
        throw new RESTError(NotOwnerError(resource), 403);
      }
      next();
    } catch (err) {
      next(err);
    }
  };
