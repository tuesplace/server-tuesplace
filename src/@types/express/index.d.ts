import { Types } from "mongoose";
import { IDocument, IProfile } from "../tuesplace";

declare global {
  namespace Express {
    interface Request {
      [key: string]: any;
      id: string;
      resources: {
        [key: string]: any;
      };
      language: string;
      auth: any;
      profile?: IDocument<IProfile>;
      ids?: {
        [key: string]: Types.ObjectId;
      };
    }
  }
}

declare global {
  namespace Express {
    interface Response {
      sendRes: (resp?: any, code?: number) => void;
    }
  }
}
