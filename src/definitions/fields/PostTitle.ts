import zod from "zod";
import { customZodRefinement } from "../../util/zod";
import { assertLengthInRange } from "../rules";

export const PostTitle = zod
  .string()
  .superRefine(customZodRefinement((val) => assertLengthInRange(150, val)));
