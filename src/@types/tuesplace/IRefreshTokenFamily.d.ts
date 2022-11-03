import { IMongooseDocument, ITimestamped } from "./IMongooseDocument";

export interface IRefreshTokenFamily extends IMongooseDocument, ITimestamped {
  redundantTokens: string[];
  lastRefresh: number;
  userId: string;
}
