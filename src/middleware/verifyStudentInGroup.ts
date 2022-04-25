import { Request, Response } from "express";
import { RESTError, StudentNotGroupMember } from "../errors";

export default async (req: Request, res: Response, next: any) => {
  try {
    const { student, group } = req;
    if (!group.allowedClasses.includes(student.class)) {
      throw new RESTError(StudentNotGroupMember, 403);
    }

    next();
  } catch (err) {
    next(err);
  }
};
