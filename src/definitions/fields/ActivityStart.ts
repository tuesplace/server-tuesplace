import zod from "zod";
import { customZodRefinement } from "../../util/zod";
import { assertNumberInRange } from "../rules";

export const ActivityStart = zod
  .number()
  .superRefine(customZodRefinement((val) => assertNumberInRange(1440, val, 0)));
