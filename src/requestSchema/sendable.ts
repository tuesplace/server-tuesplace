import zod from "zod";
import { assertConformsToArray } from "../definitions";
import { emojis } from "../util";
import { customZodRefinement } from "../util/zod";

export const reactToSendableResourceSchema = zod
  .object({
    reaction: zod
      .string()
      .superRefine(
        customZodRefinement((val) => assertConformsToArray(emojis, val))
      ),
  })
  .strict();
