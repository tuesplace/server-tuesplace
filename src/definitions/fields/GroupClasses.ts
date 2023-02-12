import zod from "zod";
import { customZodRefinement } from "../../util/zod";
import { assertConformsToArray } from "../rules";

import { classes } from "../../util";

export const GroupClasses = zod
  .array(zod.string())
  .superRefine(
    customZodRefinement((val) => assertConformsToArray(classes, val))
  );
