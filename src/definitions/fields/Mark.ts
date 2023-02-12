import zod from "zod";
import { customZodRefinement } from "../../util/zod";
import { assertNumberInRange } from "../rules";

export const MarkField = zod
  .number()
  .superRefine(customZodRefinement((val) => assertNumberInRange(6, val, 2)));
