import { StudentMarks } from "../models/Mark";
import { Request } from "express";
import { MarkNotFound, RESTError } from "../errors";

export default async (req: Request, _: any, next: any) => {
  try {
    const { markId } = req.params;
    const { group } = req;
    const mark = await StudentMarks(`${group._id.toString()}`).findById(markId);
    if (!mark) {
      throw new RESTError(MarkNotFound, 404);
    }
    req.mark = mark;

    next();
  } catch (err) {
    next(err);
  }
};
