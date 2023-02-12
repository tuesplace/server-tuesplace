import { IProfile, Resource } from "../../@types/tuesplace";
import { Profile } from "./Profile";

export const StudentResource: Resource<IProfile> = {
  ...Profile,
  lookupFieldLocation: "params.studentId",
  documentLocation: "resources.student",
};
