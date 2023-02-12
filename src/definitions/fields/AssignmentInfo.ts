import zod from "zod";
import { customZodRefinement } from "../../util/zod";
import { assertMoreThan } from "../rules";

export const AssignmentInfo = zod
  .object({
    isAssignment: zod.boolean(),
    deadline: zod
      .number()
      .superRefine(customZodRefinement((val) => assertMoreThan(val, 0))),
  })
  .optional();
