import { IMongoSchema } from ".";

export interface IRoom extends IMongoSchema {
  location: string;
}
