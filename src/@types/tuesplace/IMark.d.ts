import { IMongooseDocument } from "./IMongooseDocument";

export interface IMark extends IMongooseDocument {
  teacherId: {
    type: string;
    required: true;
  };
  mark: {
    type: string;
    required: true;
  };
  studentId: {
    type: string;
    required: true;
  };
}
