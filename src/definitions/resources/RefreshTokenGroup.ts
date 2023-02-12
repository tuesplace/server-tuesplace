import { IRefreshTokenGroup, Resource } from "../../@types/tuesplace";
import { RefreshTokenGroup as RefreshTokenGroupModel } from "../../models";

export const RefreshTokenGroup: Resource<IRefreshTokenGroup> = {
  name: {
    eng: "RefreshTokenGroup",
    bg: "RefreshTokenGroup",
  },
  lookupFieldLocation: "",
  documentLocation: "resources.refreshTokenGroup",
  by: "_id",
  model: RefreshTokenGroupModel,
};
