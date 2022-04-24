import IMongooseDocument from "./IMongooseDocument";

export default interface IMark extends IMongooseDocument {
  teacherId: {
    type: String;
    required: true;
  };
  mark: {
    type: String;
    required: true;
  };
  studentId: {
    type: String;
    required: true;
  };
}
