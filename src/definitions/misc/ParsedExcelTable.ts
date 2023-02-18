import zod from "zod";
import { classes } from "../../util";
import { customZodRefinement } from "../../util/zod";

import {
  ActivityStart,
  Email,
  GroupClasses,
  GroupName,
  GroupType,
} from "../fields";
import { ActivityEnd } from "../fields/ActivityEnd";
import { assertConformsToArray } from "../rules";

const ParsedGroup = zod
  .object({
    name: GroupName,
    classes: GroupClasses,
    type: GroupType,
    teachers: zod.array(zod.string()),
  })
  .strict();

const ParsedActivity = zod
  .object({
    day: zod.number().int(),
    start: ActivityStart,
    end: ActivityEnd,
    group: zod.string(),
    room: zod.string(),
  })
  .strict();

const ParsedTeacher = zod
  .object({
    name: zod.string(),
    email: Email,
  })
  .strict();

const ParsedStudent = zod
  .object({
    name: zod.string(),
    email: Email,
    class: zod
      .string()
      .superRefine(
        customZodRefinement((val) => assertConformsToArray(classes, val))
      ),
  })
  .strict();

const ParsedParent = zod
  .object({
    name: zod.string(),
    email: Email,
    child: zod.string(),
  })
  .strict();

export const ParsedRoom = zod.object({ location: zod.string() }).strict();

export const ParsedExcelTable = zod
  .object({
    groups: zod.array(ParsedGroup),
    activities: zod.array(ParsedActivity),
    teachers: zod.array(ParsedTeacher),
    students: zod.array(ParsedStudent),
    parents: zod.array(ParsedParent),
    rooms: zod.array(ParsedRoom),
  })
  .strict();
