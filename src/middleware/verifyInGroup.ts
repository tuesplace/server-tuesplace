import { Teacher, Admin, Group, Student } from "../definitions";
import { CriticalError, RESTError, NoAccessError } from "../errors";
import { Request } from "express";
import {
  Association,
  IDocument,
  IProfile,
  Resource,
} from "../@types/tuesplace";
import { get } from "lodash";

export const verifyInGroup =
  <T>(resource: Resource<T>) =>
  async (req: Request, _: any, next: any) => {
    try {
      const { group } = req.resources;
      const profile = get(
        req,
        resource.documentLocation
      ) as IDocument<IProfile>;
      if (!profile) {
        throw new CriticalError();
      }

      if (
        ((profile.role === Teacher.value || profile.role === Admin.value) &&
          group.owners.filter(
            (owner: Association) =>
              owner._id?.toString() === profile._id?.toString()
          ).length) ||
        (profile.role == Student.value && group.classes.includes(profile.class))
      ) {
        next();
      } else {
        throw new RESTError(NoAccessError(Group), 401);
      }
    } catch (err) {
      next(err);
    }
  };
