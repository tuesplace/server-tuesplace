import { IProfile, Resource } from "../../@types/tuesplace";
import { Profile as ProfileModel } from "../../models";

export const Profile: Resource<IProfile> = {
  name: {
    eng: "Profile",
    bg: "Профил",
  },
  lookupFieldLocation: "params.profileId",
  documentLocation: "profile",
  by: "_id",
  model: ProfileModel,
};
