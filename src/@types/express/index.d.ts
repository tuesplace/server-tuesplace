import Group from "../models/Group";
import Profile from "../models/Profile";
import { GroupPosts, PostComments } from "../models/Post";
import { StudentMarks } from "../models/Mark";

declare global {
  namespace Express {
    interface Request {
      group?: typeof Group;
      profile?: typeof Profile;
      student?: typeof Profile;
      post?: typeof GroupPosts;
      mark?: typeof StudentMarks;
      comment?: typeof PostComments;
      auth: any;
    }
  }
}

declare global {
  namespace Express {
    interface Response {
      sendRes: any;
    }
  }
}
