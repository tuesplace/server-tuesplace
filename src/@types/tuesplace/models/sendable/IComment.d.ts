import { IMongoSchema } from "../IMongoSchema";
import { IPublicSendable } from "./IPublicSendable";

export interface IComment extends IMongoSchema, IPublicSendable {
  isPrivate: boolean;
}
