import IMongooseDocument from "./IMongooseDocument";

export default interface IPostComment extends IMongooseDocument {
  authorId: string;
  body: string;
  reactions: Array<any>;
}
