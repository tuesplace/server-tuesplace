import IMongooseDocument from "./IMongooseDocument";

export default interface IProfile extends IMongooseDocument {
  fullName: string;
  email: string;
  password: string;
  emailVerified: boolean;
  class: string;
  role: string;
}
