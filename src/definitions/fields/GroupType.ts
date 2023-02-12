import zod from "zod";
import { customZodRefinement } from "../../util/zod";
import { assertConformsToArray } from "../rules";

import { types as groupTypes } from "../../util";

export const GroupType = zod
  .string()
  .superRefine(
    customZodRefinement((val) => assertConformsToArray(groupTypes, val))
  );
