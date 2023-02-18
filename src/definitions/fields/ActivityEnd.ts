import zod from "zod";
import { customZodRefinement } from "../../util/zod";
import { assertNumberInRange } from "../rules";

export const ActivityEnd = zod
  .number()
  .superRefine(customZodRefinement((val) => assertNumberInRange(1440, val, 0)));
