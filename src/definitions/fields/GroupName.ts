import zod from "zod";
import { customZodRefinement } from "../../util/zod";
import { assertLengthInRange } from "../rules";

export const GroupName = zod
  .string()
  .superRefine(customZodRefinement((val) => assertLengthInRange(60, val)));
