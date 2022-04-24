import { Request, Response } from "express";

export default async (req: Request, res: Response, next: any) => {
  try {
    const { student, group } = req;
    if (!group.allowedClasses.includes(student.class)) {
      throw {
        student: "Student is not a part of this group",
        status: 400,
      };
    }

    next();
  } catch (err) {
    next(err);
  }
};
