import { Types } from "mongoose";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { IAsset, IDocument, IProfile, ResolvedMulterFile } from "../tuesplace";

declare global {
  namespace Express {
    interface Request {
      io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
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
      assets: {
        [key: string]: IDocument<IAsset>[];
      };
      resolvedFiles: ResolvedMulterFile[];
    }
  }
}

declare global {
  namespace Express {
    interface Response {
      sendRes: (resp?: any, code?: number, shouldResolve?: boolean) => void;
    }
  }
}
