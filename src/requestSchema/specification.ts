import zod from "zod";
import { assertInDB, Specification } from "../definitions";
import { InvalidValueError } from "../errors";
import { customZodRefinement } from "../util/zod";

export const createSpecificationSchema = zod
  .object({})
  .strict()
  .superRefine(
    customZodRefinement(async (val) =>
      Object.keys(val).length
        ? InvalidValueError("{}")
        : assertInDB(Specification, false, {})
    )
  );
