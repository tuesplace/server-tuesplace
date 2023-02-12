import { Request, Response } from "express";
import { Role } from "../@types/tuesplace";
import { RESTError, NotRoleError, CriticalError } from "../errors";

export const verifyRole =
  (...roles: Role[]) =>
  (req: Request, _res: Response, next: any) => {
    try {
      const { profile } = req;
      if (!profile) {
        throw new CriticalError();
      }

      if (roles.findIndex((role) => role.value === profile.role) == -1) {
        throw new RESTError(NotRoleError(roles), 403);
      }

      next();
    } catch (err) {
      next(err);
    }
  };
