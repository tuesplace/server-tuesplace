import { Types } from "mongoose";
import zod from "zod";
import {
  ActivityDay,
  ActivityStart,
  assertActivityUniqueByGroup,
  assertActivityUniqueByRoom,
  assertInDB,
  Group,
  ActivityEnd,
} from "../definitions";
import { Room } from "../definitions";
import { InvalidValueError } from "../errors";
import { customZodRefinement } from "../util/zod";

const activitySchema = zod.object({
  day: ActivityDay,
  start: ActivityStart,
  end: ActivityEnd,
  group: zod.string().superRefine(
    customZodRefinement((val) =>
      assertInDB(Group, true, {
        _id: new Types.ObjectId(val),
        type: "subject",
      })
    )
  ),
  room: zod
    .string()
    .superRefine(
      customZodRefinement((val) =>
        assertInDB(Room, true, { _id: new Types.ObjectId(val) })
      )
    ),
});

export const createActivitySchema = activitySchema.superRefine(
  customZodRefinement(async (val) =>
    val.start >= val.end
      ? InvalidValueError("start < end")
      : (await assertActivityUniqueByGroup(val)) ||
        (await assertActivityUniqueByRoom(val))
  )
);
