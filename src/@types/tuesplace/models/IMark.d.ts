import { Associations, Owned } from "..";
import { IMongoSchema } from ".";

export interface IMark extends IMongoSchema, Owned, Associations {
  mark: number;
}
