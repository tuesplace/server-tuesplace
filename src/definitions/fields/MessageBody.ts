import zod from "zod";
import { customZodRefinement } from "../../util/zod";
import { assertLengthInRange } from "../rules";

export const MessageBody = zod
  .string()
  .superRefine(customZodRefinement((val) => assertLengthInRange(400, val)));
