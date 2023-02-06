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
import { IModel } from "../@types/tuesplace";

export const collectionToModels: { [key: string]: IModel<unknown> } = {
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
