import { Associations } from "..";
import { IMongoSchema } from ".";

export interface IActivity extends IMongoSchema, Associations {
  start: number;
  end: number;
  day: number;
}
