import zod from "zod";
import {
  assertConformsToArray,
  assertDeviceTokenType,
  assertEmailLike,
  assertInDB,
  assertLengthInRange,
  assertMoreThan,
  assertNumberInRange,
  assertPasswordLike,
} from "../rules";
import { Profile } from "../resources";
import {
  types as groupTypes,
  classes as groupClasses,
  emojis,
} from "../../util";
import { customZodRefinement } from "../../util/zod";

export const FullName = zod
  .string()
  .superRefine(customZodRefinement((val) => assertLengthInRange(60, val)));

export const Email = zod
  .string()
  .superRefine(customZodRefinement(assertEmailLike));

export const UniqueEmail = Email.superRefine(
  customZodRefinement(
    async (email) => await assertInDB(Profile, false, { email })
  )
);

export const Password = zod
  .string()
  .superRefine(customZodRefinement(assertPasswordLike));

export const PostBody = zod
  .string()
  .superRefine(customZodRefinement((val) => assertLengthInRange(400, val)));

export const CommentBody = zod
  .string()
  .superRefine(customZodRefinement((val) => assertLengthInRange(400, val)));

export const CommentIsPrivate = zod.boolean();

export const Reaction = zod
  .string()
  .superRefine(
    customZodRefinement((val) => assertConformsToArray(emojis, val))
  );

export const MarkField = zod
  .number()
  .superRefine(customZodRefinement((val) => assertNumberInRange(6, val, 2)));

export const GroupName = zod
  .string()
  .superRefine(customZodRefinement((val) => assertLengthInRange(60, val)));

export const GroupType = zod
  .string()
  .superRefine(
    customZodRefinement((val) => assertConformsToArray(groupTypes, val))
  );

export const GroupClasses = zod
  .array(zod.string())
  .superRefine(
    customZodRefinement((val) => assertConformsToArray(groupClasses, val))
  );

export const AssignmentInfo = zod
  .object({
    isAssignment: zod.boolean(),
    deadline: zod
      .number()
      .superRefine(customZodRefinement((val) => assertMoreThan(val, 0))),
  })
  .optional();

export const DeviceToken = zod.object({
  address: zod.string(),
  type: zod.string().superRefine(customZodRefinement(assertDeviceTokenType)),
});
