import { Types } from "mongoose";
import { IDocument } from "../models";

export type Association = {
  _id: Types.ObjectId;
  collectionName: string;
  data?: IDocument;
  shouldResolve: boolean;
};
