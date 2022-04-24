import { IMongooseDocument } from "./IMongooseDocument";

export interface IPostComment extends IMongooseDocument {
  authorId: string;
  body: string;
  reactions: Array<any>;
}
