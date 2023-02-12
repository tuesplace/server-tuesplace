import zod from "zod";
import { customZodRefinement } from "../../util/zod";
import { assertPasswordLike } from "../rules";

export const Password = zod
  .string()
  .superRefine(customZodRefinement(assertPasswordLike));
