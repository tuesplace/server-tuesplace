import multer from "multer";

export interface FileFormField extends multer.Field {
  allowedMimetypes?: string[];
}
