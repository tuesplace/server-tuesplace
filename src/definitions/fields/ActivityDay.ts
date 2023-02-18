import zod from "zod";
import { customZodRefinement } from "../../util/zod";
import { assertNumberInRange } from "../rules";

export const ActivityDay = zod
  .number()
  .int()
  .superRefine(customZodRefinement((val) => assertNumberInRange(8, val, 0)));
