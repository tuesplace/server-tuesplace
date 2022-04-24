import { StudentMarks } from "../models/Mark";
import { Request } from "express";

export default async (req: Request, _: any, next: any) => {
  try {
    const { markId } = req.params;
    const { group } = req;
    const mark = await StudentMarks(`${group._id.toString()}`).findById(markId);
    if (!mark) {
      throw { post: "Mark not found", status: 404 };
    }
    req.mark = mark;

    next();
  } catch (err) {
    next(err);
  }
};
