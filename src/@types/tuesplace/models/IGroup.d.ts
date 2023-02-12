import { Associations, OwnedByMany } from "..";
import { IMongoSchema } from ".";

export interface IGroup extends IMongoSchema, OwnedByMany, Associations {
  name: string;
  type: string;
  assets: Assets;
  classes: Array<string>;
}
