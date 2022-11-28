import { Request, Response } from "express";
import { Role } from "../@types/tuesplace";
import { RESTError, NotRoleError, CriticalError } from "../errors";

export const verifyRole =
  (role: Role) => (req: Request, _res: Response, next: any) => {
    try {
      const { profile } = req;
      if (!profile) {
        throw new CriticalError();
      }

      if (profile.role !== role.value) {
        throw new RESTError(NotRoleError(role), 403);
      }

      next();
    } catch (err) {
      next(err);
    }
  };
