import { StudentMarks } from "../models/Mark";
import Profile from "../models/Profile";
import { validateMark } from "../util/validators";
import { Request, Response } from "express";

const getMarks = async (req: Request, res: Response, next: any) => {
  try {
    const { group } = req;
    const marks = await StudentMarks(group._id.toString()).find({});
    res.sendRes(marks);
  } catch (err) {
    next(err);
  }
};

const getStudentMarks = async (req: Request, res: Response, next: any) => {
  try {
    const { group, student } = req;
    const studentMarks = await StudentMarks(group._id.toString()).find({
      studentId: student._id.toString(),
    });
    res.sendRes(studentMarks);
  } catch (err) {
    next(err);
  }
};

const addMark = async (req: Request, res: Response, next: any) => {
  try {
    const { group, student } = req;
    const { mark } = req.body;
    const { errors, valid } = validateMark(mark);
    if (!valid) {
      throw { ...errors, status: 400 };
    }
    await StudentMarks(group._id.toString()).create({
      teacherId: req.auth.userId,
      studentId: student._id.toString(),
      mark,
    });
    res.status(204).sendRes();
  } catch (err) {
    next(err);
  }
};

const editMark = async (req: Request, res: Response, next: any) => {
  try {
    const { mark } = req;
    const { mark: newMark } = req.body;
    const { errors, valid } = validateMark(newMark);
    if (!valid) {
      throw { ...errors, status: 400 };
    }
    await mark.updateOne({
      mark: newMark,
    });
    res.status(204).sendRes();
  } catch (err) {
    next(err);
  }
};

const deleteMark = async (req: Request, res: Response, next: any) => {
  try {
    const { mark } = req;
    await mark.deleteOne();
    res.status(204).sendRes();
  } catch (err) {
    next(err);
  }
};

export { getMarks, getStudentMarks, addMark, editMark, deleteMark };
