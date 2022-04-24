import IMongooseDocument from "./IMongooseDocument";

export default interface IGroup extends IMongooseDocument {
  groupName: string;
  isChat: boolean;
  allowedClasses: Array<string>;
  teachers: Array<string>;
  admins: Array<string>;
}
