import { Request } from "express";
import { IDocument } from "../models";

export type EditResourceOptions<T> = {
  afterEdit: {
    [key: string]: (doc: IDocument<T>, context: Request) => Promise<void>;
  };
};
