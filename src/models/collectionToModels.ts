import {
  Comment,
  Group,
  Mark,
  Post,
  Profile,
  RefreshTokenGroup,
  Submission,
  Asset,
  Activity,
  Room,
} from ".";
import {
  IActivity,
  IAsset,
  IComment,
  IGroup,
  IMark,
  IModel,
  IPost,
  IProfile,
  IRefreshTokenGroup,
  IRoom,
  ISubmission,
} from "../@types/tuesplace";

export const collectionToModels: {
  [key: string]: any;
  comments: IModel<IComment>;
  groups: IModel<IGroup>;
  marks: IModel<IMark>;
  posts: IModel<IPost>;
  profiles: IModel<IProfile>;
  refreshTokenGroups: IModel<IRefreshTokenGroup>;
  submissions: IModel<ISubmission>;
  assets: IModel<IAsset>;
  activities: IModel<IActivity>;
  rooms: IModel<IRoom>;
} = {
  comments: Comment,
  groups: Group,
  marks: Mark,
  posts: Post,
  profiles: Profile,
  refreshTokenGroups: RefreshTokenGroup,
  submissions: Submission,
  assets: Asset,
  activities: Activity,
  rooms: Room,
};
