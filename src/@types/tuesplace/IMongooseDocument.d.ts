export interface IMongooseDocument {
  _doc: any;
}

export interface ITimestamped {
  createdAt: date;
  updatedAt: date;
}
