import zod from "zod";
import { customZodRefinement } from "../../util/zod";
import { assertConformsToArray } from "../rules";
import { classes } from "../../util";

export const Class = zod
  .string()
  .superRefine(
    customZodRefinement((val) => assertConformsToArray(classes, val))
  );
