import { IMongooseDocument } from "./IMongooseDocument";

export interface IProfile extends IMongooseDocument {
  fullName: string;
  email: string;
  password: string;
  emailVerified: boolean;
  class: string;
  role: string;
}
