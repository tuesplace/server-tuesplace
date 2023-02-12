import { IMongoSchema } from ".";
import { Owned } from "..";

export interface IRefreshTokenGroup extends IMongoSchema, Owned {
  usedRefreshTokens: string[];
}
