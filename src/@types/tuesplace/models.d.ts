import { Document, Types } from "mongoose";
import {
  Assets,
  Owned,
  OwnedByMany,
  Associations,
  Assignment,
  Body,
  Reaction,
  DeviceToken,
  Verifications,
} from ".";

export interface IMongoSchema {
  _doc: any;
}

export type IDocument<T> = Document<unknown, any, T> &
  T & { _id: Types.ObjectId; _doc: object };

export type IModel<T> = Model<
  T,
  unknown,
  unknown,
  unknown,
  Schema<
    T,
    Model<T, any, any, any, any>,
    unknown,
    unknown,
    unknown,
    unknown,
    "type",
    T
  >
>;

export interface ITimestamped {
  createdAt: date;
  updatedAt: date;
}

interface ISendable
  extends IMongoSchema,
    Owned,
    Associations,
    ITimestamped,
    Assets {}

interface IPublicSendable extends ISendable, Body {
  reactions: Reaction[];
}

export interface IPost extends IPublicSendable {
  assignmentInfo?: Assignment;
}

export interface IComment extends IPublicSendable {
  isPrivate: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ISubmission extends ISendable {}

export interface IProfile extends IMongoSchema, Assets {
  fullName: string;
  email: string;
  password: string;
  verifications: Verifications;
  class: string;
  role: string;
  deviceTokens: [DeviceToken];
}

export interface IMark extends IMongoSchema, Owned, Associations {
  mark: number;
}

export interface IRefreshTokenGroup extends IMongoSchema, Owned {
  usedRefreshTokens: string[];
}

export interface IGroup extends IMongoSchema, OwnedByMany, Associations {
  name: string;
  type: string;
  assets: Assets;
  classes: Array<string>;
}

export interface IAsset extends IMongoSchema, Owned, ITimestamped {
  key: string;
  mimetype: string;
  src?: string;
  meta: {
    originalName: string;
    size: number;
  };
}

export interface IActivity extends IMongoSchema, Associations {
  start: number;
  end: number;
  day: number;
}

export interface IRoom extends IMongoSchema {
  location: string;
}
