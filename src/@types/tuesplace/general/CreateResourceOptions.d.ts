import { Request } from "express";

export type CreateResourceOptions = {
  resolveAttrs?: (context: Request) => object;
  afterCreate?: (context: Request) => Promise<void>;
};
