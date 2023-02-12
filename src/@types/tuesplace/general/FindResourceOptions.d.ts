import { Request } from "express";

export type FindResourceOptions = {
  resolveAttrs?: (context: Request) => object | Promise<object>;
};
