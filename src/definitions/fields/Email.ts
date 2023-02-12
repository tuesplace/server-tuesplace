import zod from "zod";
import { customZodRefinement } from "../../util/zod";
import { assertEmailLike } from "../rules";

export const Email = zod
  .string()
  .superRefine(customZodRefinement(assertEmailLike));
