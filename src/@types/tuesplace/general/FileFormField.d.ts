import multer from "multer";

export interface FileFormField extends multer.Field {
  mimetype?: string;
}
