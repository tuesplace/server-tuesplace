import { Types } from "mongoose";
import zod from "zod";
import {
  assertActivityUniqueByGroup,
  assertActivityUniqueByRoom,
  assertInDB,
  assertNumberInRange,
  Group,
} from "../definitions";
import { Room } from "../definitions";
import { InvalidValueError } from "../errors";
import { customZodRefinement } from "../util/zod";

const activitySchema = zod.object({
  day: zod
    .number()
    .int()
    .superRefine(customZodRefinement((val) => assertNumberInRange(8, val, 0))),
  start: zod
    .number()
    .superRefine(
      customZodRefinement((val) => assertNumberInRange(1440, val, 0))
    ),
  end: zod
    .number()
    .superRefine(
      customZodRefinement((val) => assertNumberInRange(1440, val, 0))
    ),
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
