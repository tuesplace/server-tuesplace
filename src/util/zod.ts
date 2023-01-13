import { RefinementCtx } from "zod";
import { TypedError } from "../@types/tuesplace";

export const customZodRefinement =
  (
    getErrorCallback: (
      val: any
    ) => Promise<TypedError | null> | TypedError | null
  ) =>
  async (val: any, ctx: RefinementCtx) => {
    const err = await getErrorCallback(val);
    if (err) {
      ctx.addIssue({
        code: "custom",
        params: err,
      });
    }
  };
