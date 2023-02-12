import { Assets, DeviceToken, Verifications } from "..";
import { IMongoSchema } from ".";

export interface IProfile extends IMongoSchema, Assets {
  fullName: string;
  email: string;
  password: string;
  verifications: Verifications;
  class: string;
  role: string;
  deviceTokens: [DeviceToken];
}
