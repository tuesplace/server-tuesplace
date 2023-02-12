import zod from "zod";
import { emojis } from "../../util";
import { customZodRefinement } from "../../util/zod";
import { assertConformsToArray } from "../rules";

export const Reaction = zod
  .string()
  .superRefine(
    customZodRefinement((val) => assertConformsToArray(emojis, val))
  );
