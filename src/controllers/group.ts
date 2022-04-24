import { RESTError } from "../errors";
import Group from "../models/Group";
import { validateGroup } from "../util/validators";
import { Request, Response } from "express";
import { IGroup } from "../@types/tuesplace";

const getGroup = async (req: Request, res: Response, next: any) => {
  try {
    const { group } = req;
    res.sendRes({ ...group._doc });
  } catch (err) {
    next(err);
  }
};

const createGroup = async (req: Request, res: Response, next: any) => {
  try {
    const { groupName, teachers, allowedClasses } = req.body;
    const { errors, valid } = validateGroup(
      <IGroup>{ groupName, teachers, allowedClasses },
      true
    );
    if (!valid) {
      throw new RESTError(errors, 400);
    }
    const group = await Group.create({
      groupName,
      teachers,
      allowedClasses,
    });
    res.sendRes(group);
  } catch (err) {
    next(err);
  }
};

const editGroup = async (req: Request, res: Response, next: any) => {
  try {
    const { group } = req;
    const { groupName, teachers, allowedClasses } = req.body;
    const { errors, valid } = validateGroup(
      <IGroup>{ groupName, teachers, allowedClasses },
      false
    );
    if (!valid) {
      throw new RESTError(errors, 400);
    }

    group.groupName = groupName || group.groupName;
    group.teachers = teachers || group.teachers;
    group.allowedClasses = allowedClasses || group.allowedClasses;
    await group.save();
    res.sendRes({ ...group._doc });
  } catch (err) {
    next(err);
  }
};

const deleteGroup = async (req: Request, res: Response, next: any) => {
  try {
    const { group } = req;
    await group.deleteOne();
    res.status(204);
  } catch (err) {
    next(err);
  }
};

export { getGroup, createGroup, editGroup, deleteGroup };
