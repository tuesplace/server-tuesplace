import { IMongoSchema, ITimestamped } from ".";
import { Owned } from "..";

export interface IAsset extends IMongoSchema, Owned, ITimestamped {
  key: string;
  mimetype: string;
  src?: string;
  meta: {
    originalName: string;
    size: number;
  };
}
