import { Request } from "express";
import { Owners } from "./Owners";
import { customZodRefinement } from "../../util/zod";
import { assertNotInArray } from "../rules";

export const GroupOwners = (context: Request) =>
  Owners({ role: "teacher" }).superRefine(
    customZodRefinement((val) =>
      assertNotInArray(val, context.profile?._id?.toString())
    )
  );
