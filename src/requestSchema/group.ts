import zod from "zod";
import { GroupType, Classes, GroupName, GroupOwners } from "../definitions";
import { Request } from "express";

export const createGroupSchema = (context: Request) =>
  zod
    .object({
      name: GroupName,
      type: GroupType,
      classes: Classes,
      owners: GroupOwners(context).optional(),
    })
    .strict();

export const editGroupSchema = (context: Request) =>
  createGroupSchema(context).partial().strict();
