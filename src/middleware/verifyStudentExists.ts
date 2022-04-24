import Profile from "../models/Profile";
import roles from "../util/roles";
import { Request, Response } from "express";
import { RESTError, StudentNotFound, StudentRoleInvalid } from "../errors";

export default async (req: Request, _res: Response, next: any) => {
  try {
    const { studentId } = req.params;
    const student = await Profile.findById(studentId);
    if (!student) {
      throw new RESTError(StudentNotFound, 404);
    }
    if (student.role !== roles.student) {
      throw new RESTError(StudentRoleInvalid, 400);
    }
    req.student = student;
    next();
  } catch (err) {
    next(err);
  }
};
