import zod from "zod";
import { customZodRefinement } from "../../util/zod";
import { allRoles } from "../roles";
import { assertConformsToArray } from "../rules";

export const Role = zod.string().superRefine(
  customZodRefinement((val) =>
    assertConformsToArray(
      allRoles.map((role) => role.value),
      val
    )
  )
);
