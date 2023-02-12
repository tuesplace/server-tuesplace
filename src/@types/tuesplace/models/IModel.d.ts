import { DefaultSchemaOptions, Model } from "mongoose";
import { IMongoSchema } from "./IMongoSchema";

export type IModel<T> = Model<
  IMongoSchema & T,
  unknown,
  unknown,
  unknown,
  Schema<
    IMongoSchema & T,
    Model<T, any, any, any, any>,
    unknown,
    unknown,
    unknown,
    unknown,
    DefaultSchemaOptions,
    IMongoSchema & T
  >
>;
