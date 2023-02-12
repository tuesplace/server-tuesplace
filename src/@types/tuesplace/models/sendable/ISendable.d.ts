import { Assets, Associations, Owned } from "../..";
import { IMongoSchema, ITimestamped } from "..";

interface ISendable
  extends IMongoSchema,
    Owned,
    Associations,
    ITimestamped,
    Assets {}
