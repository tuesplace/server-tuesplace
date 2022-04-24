import { RESTError } from "../errors";
import Group from "../models/Group";
import Profile from "../models/Profile";
import roles from "../util/roles";
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
    const { groupId } = req.params;
    const { groupName, teachers, allowedClasses } = req.body;
    const { errors, valid } = validateGroup(
      <IGroup>{ groupName, teachers, allowedClasses },
      false
    );
    if (!valid) {
      throw { ...errors };
    }
    const group = await Group.findById(groupId);
    if (!group) {
      throw { group: "Group not found", status: 404 };
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
    const profile = await Profile.findById(req.auth.userId);
    if (!profile) {
      throw { profile: "Profile Not Found", status: 404 };
    }
    if (profile.role != roles.admin) {
      throw { profile: "Profile not admin", status: 401 };
    }
    const { groupId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) {
      throw { group: "Group not found", status: 404 };
    }
    await group.deleteOne();
    res.status(204);
  } catch (err) {
    next(err);
  }
};

export { getGroup, createGroup, editGroup, deleteGroup };
