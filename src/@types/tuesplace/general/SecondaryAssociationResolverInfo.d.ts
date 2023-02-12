import { Request } from "express";
import { Resource } from "./Resource";

export type SecondaryAssociationResolverInfo =
  | {
      resource: Resource<any>;
      lookupName: string;
      association?: string;
      query: "count" | "ifPresent" | "itself";
      from?: string;
      resolveAttrs?: (context: Request) => Promise<object>;
    }[];
